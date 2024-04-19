// const api = "https://fakestoreapi.com/products/category/electronics";
const api = "http://127.0.0.1:5000/api/products";

async function fetchData() {
  const response = await fetch(api);
  const apiData = await response.json();
  return apiData;
}

// fetchData().then((data) =>
//   localStorage.setItem("mainProducts", JSON.stringify(data))
// );

// fetchData().then((data) => console.log(data));

const navLink = document.querySelectorAll(".nav-link");
navLink.forEach((link) => {
  link.addEventListener("click", (e) => {
    navLink.forEach((item) => {
      item.classList.remove("active");
    });
    link.classList.add("active");
  });
});
