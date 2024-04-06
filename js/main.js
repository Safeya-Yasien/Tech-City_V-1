const landingPage = document.querySelector(".landing");
const imgs = [
  "imgs/wallpaperflare-2.jpg",
  "imgs/wallpaperflare-3.jpg",
  "imgs/wallpaperflare-1.jpg",
  "imgs/wallpaperflare-4.jpg",
  "imgs/wallpaperflare-5.jpg",
];

let currentIndex = 0;

function changeLandingBackground() {
  landingPage.style.backgroundImage = `url('${imgs[currentIndex]}')`;

  if (currentIndex == imgs.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }

  setTimeout(() => changeLandingBackground(), 3000);
}

function displayData(apiData) {
  const productsContent = document.querySelector(".products-content");

  let html = "";

  for (let i = 0; i < apiData.length; i++) {
    html += `
      <div class="col-lg-4 col-md-4 col-sm-6 mb-4">
        <div class="box" onclick="openProductPage('${apiData[i].id}')">
          <div class="product-header">
            <h2>${apiData[i].title}</h2>
            <p>${apiData[i].description} </p>
          </div>

          <div class="product-img">
              <img src="${apiData[i].image}" alt='product'/>
          </div>

          <div class="product-footer">
          <div class="reviews">
            <div class='icons'>
              ${prodcutRating(apiData[i].rating.rate)}
            </div>
            <span>${apiData[i].rating.rate}</span>
          </div>

            <div class="product-price">
              <p>${apiData[i].price}$</p>
              <i class="fa-solid fa-cart-shopping"></i>
            </div>
            
          </div>
        </div>
      </div>
    `;
  }

  productsContent.innerHTML = `<div class="row">${html}</div>`;
}

changeLandingBackground();
fetchData().then(displayData);

function openProductPage(productId) {
  window.location.href = `single_product.html?id=${productId}`;
  localStorage.setItem("productId", productId);
  window.location.href = "single_product.html";
}
