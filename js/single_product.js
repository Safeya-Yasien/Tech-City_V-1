let products = JSON.parse(localStorage.getItem("products"));
let productId = parseInt(localStorage.getItem("productId"));
let productDetails = products.find((item) => item.id === productId);
let productContainer = document.querySelector(".product .card");

console.log(products);
console.log(productId);
console.log(productDetails);

productContainer.innerHTML = `
    <div class="row g-0">
    <div class="col-md-6">
    <img
        src="${productDetails.image}"
        class="img-fluid rounded-start"
        alt="phone"
    />
    </div>
    <div class="col-md-6 product-info">
    <div class="card-body">
        <h5 class="card-title">${productDetails.title}</h5>
        <div class="reviews">
            <div class='icons'>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </div>
            <span>${productDetails.rating.rate}</span>
        </div>
        <p class="card-text">
        ${productDetails.description}
        </p>
        <p class="card-text price">${productDetails.price}$</p>
        <div>
        <button class="btn">Add to cart</button>
        <button class="btn">Buy Now</button>
        </div>
    </div>
    </div>
    </div>
`;
