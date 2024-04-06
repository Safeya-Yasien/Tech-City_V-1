const api = "https://fakestoreapi.com/products/category/electronics";

async function fetchData() {
  const response = await fetch(api);
  const apiData = await response.json();
  return apiData;
}

fetchData().then((data) =>
  localStorage.setItem("mainProducts", JSON.stringify(data))
);

// fetchData().then((data) => console.log(data));

const navLink = document.querySelectorAll(".nav-link");
navLink.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navLink.forEach((item) => {
      item.classList.remove("active");
    });
    link.classList.add("active");
  });
});

function prodcutRating(rate) {
  let realNumber = Math.trunc(rate);
  let decimal = rate - realNumber;
  let stars = "";
  for (let i = 1; i <= realNumber; i++) {
    stars += `<i class="fa-solid fa-star"></i>`;
  }

  if (decimal > 0.5) {
    stars += `<i class="fa-regular fa-star-half-stroke"></i>`;
  } else if (decimal < 0.5 && decimal > 0.1) {
    stars += `<i class="fa-regular fa-star"></i>`;
  }

  if (realNumber < 4) {
    stars += `<i class="fa-regular fa-star"></i>`;
  }
  if (realNumber < 3) {
    stars += `<i class="fa-regular fa-star"></i>`;
  }
  if (realNumber < 2) {
    stars += `<i class="fa-regular fa-star"></i>`;
  }

  return stars;
}
