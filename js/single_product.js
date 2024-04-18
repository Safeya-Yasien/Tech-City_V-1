const urlParams = new URLSearchParams(window.location.search);
const productString = urlParams.get("product");
const productDetails = JSON.parse(productString);

let productContainer = document.querySelector(".product .card");

productContainer.innerHTML = `
    <div class="row g-0">
    <div class="col-md-6">
    
    </div>
    <div class="col-md-6 product-info">
    <div class="card-body">
        <h5 class="card-title">${productDetails.name}</h5>
        
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
