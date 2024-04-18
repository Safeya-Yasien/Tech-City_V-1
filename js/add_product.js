const productTitle = document.querySelector("#product-title"),
  productDescription = document.querySelector("#product-description"),
  productCategory = document.querySelector("#product-category"),
  productPrice = document.querySelector("#product-price"),
  publishProductButton = document.querySelector("#publish-product-button"),
  discardProductButton = document.querySelector("#discard-product-button"),
  uploadImgButton = document.querySelector("#file"),
  uploadedImgContainer = document.querySelector(".uploaded-img");
let products;
let mood = "create";
publishProductButton.addEventListener("click", addProduct);
discardProductButton.addEventListener("click", clearData);
uploadImgButton.addEventListener("change", uploadImg);

function checkProductInLocalStorage() {
  if (localStorage.getItem("product") !== null) {
    products = JSON.parse(localStorage.getItem("product"));
  } else {
    products = [];
  }
}

function addProduct() {
  if (
    productTitle.value === "" ||
    productPrice.value === "" ||
    productCategory.value === "" ||
    !uploadedImgContainer.querySelector("img")
  )
    return;

  let imgSrc = null;
  const uploadedImage = uploadedImgContainer.querySelector("img");
  if (uploadedImage) {
    imgSrc = uploadedImage.src;
  }

  let newProduct = {
    title: productTitle.value.trim().toLowerCase(),
    description: productDescription.value.trim()
      ? productDescription.value.toLowerCase()
      : "No description provided",
    category: productCategory.value.trim().toLowerCase(),
    image: imgSrc,
    price: productPrice.value.trim(),
    timestamp: new Date(),
  };

  if (
    productTitle.value !== "" &&
    productPrice.value !== "" &&
    productCategory.value !== "" &&
    imgSrc
  ) {
    publishProductButton.innerHTML = "Publish Product";
    products.push(newProduct);
    displaySuccessMessage("Product Added Successfully");

    clearData();
  }

  localStorage.setItem("product", JSON.stringify(products));
}

function clearData() {
  productTitle.value = "";
  productDescription.value = "";
  productCategory.value = "";
  productPrice.value = "";

  const uploadedImage = uploadedImgContainer.querySelector("img");
  const deleteButton = uploadedImgContainer.querySelector("button");
  if (uploadedImage) {
    uploadedImgContainer.removeChild(uploadedImage);
  }
  if (deleteButton) {
    uploadedImgContainer.removeChild(deleteButton);
  }
}

// upload img
function uploadImg(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const imgSrc = e.target.result;

      const imgElement = document.createElement("img");
      imgElement.src = imgSrc;
      imgElement.alt = "product";

      const deleteButton = document.createElement("button");
      deleteButton.className = "btn";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function () {
        uploadedImgContainer.removeChild(imgElement);
        uploadedImgContainer.removeChild(deleteButton);

        uploadImgButton.value = "";
        uploadImgButton.removeEventListener("change", uploadImg);
        uploadImgButton.addEventListener("change", uploadImg);
      });

      uploadedImgContainer.appendChild(imgElement);
      uploadedImgContainer.appendChild(deleteButton);
    };
    reader.readAsDataURL(file);
  }
}

// if product created successfully
function displaySuccessMessage(message) {
  const successMessageCotainer = document.querySelector(
    ".success-message-container"
  );
  const successMessage = document.querySelector(".success-message");
  const productsPageLink = document.querySelector(".see-products");
  successMessage.innerHTML = message;
  successMessageCotainer.style.display = "block";

  // productsPageLink.href='#tab-2'

  productsPageLink.addEventListener("click", redirectToProductsPage);
}

function redirectToProductsPage() {
  const AllTabs = document.querySelectorAll(".tab");
  const tabTwo = document.querySelector("#tab-2");

  AllTabs.forEach((tab) => {
    console.log(tab);
    tab.classList.remove("active");
  });

  // tabTwo.classList.add("active");

  $(tabTwo).hide().fadeIn(1000);
}

checkProductInLocalStorage();
