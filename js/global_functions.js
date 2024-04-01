const api = "https://fakestoreapi.com/products/category/electronics";

async function fetchData() {
  const response = await fetch(api);
  const apiData = await response.json();
  return apiData;
}

fetchData().then((data) =>
  localStorage.setItem("products", JSON.stringify(data))
);

const navLink = document.querySelectorAll(".nav-link");
navLink.forEach((link) => {
  link.addEventListener("click", (e) => {
    navLink.forEach((item) => {
      item.classList.remove("active");
    });
    link.classList.add("active");
  });
});
