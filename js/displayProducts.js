const productsAddProductButton = document.querySelector(
  "#products-add-product"
);
const AllTabs = document.querySelectorAll(".tab");
let temp;

productsAddProductButton.addEventListener("click", displayAddProductFrom);

async function fetchProducts() {
  const response = await fetch(api);
  const apiData = await response.json();

  console.log(apiData);

  const localStorageData = JSON.parse(localStorage.getItem("product")) || [];
  const mergedData = localStorageData.concat(apiData);
  displayProducts(mergedData);
}

function displayProducts(apiData) {
  console.log(apiData);

  const tbody = document.querySelector("#tab-2 .products-table table tbody");
  tbody.innerHTML = "";

  for (let i = 0; i < apiData.length; i++) {
    const tr = document.createElement("tr");

    tr.innerHTML = `

    <td>
        <div class="form">
        <input type="checkbox" class="form-check-input" />
        </div>
    </td>
    <td>
        <img src='' alt=''>
    </td>
    <td>
        <a class="product-name" href="#">
        ${apiData[i].name}
        </a>
    </td>
    <td class='product-price-update'>${apiData[i].price}</td>
    <td class='product-category-update'>${apiData[i].category}</td>
    <td>${formatDate(apiData[i].created_at)}</td>
    <td class='position-relative'>
        <a
        href="#"
        class="ellipsis-menu-toggle"
        >
        <i class="fa-solid fa-ellipsis"></i>
        </a>
        <ul class="ellipsis-menu submenu">
        <li>
        <a href="#" onclick='updateProduct(${i})'>update</a>
        </li>
        <li>
            <a href="#" onclick='removeProduct(${i})'>remove</a>
        </li>
        </ul>
    </td>

    `;

    tbody.appendChild(tr);

    const ellipsisMenuToggle = tr.querySelector(".ellipsis-menu-toggle");
    const ellipsisMenu = tr.querySelector(".ellipsis-menu");
    ellipsisMenuToggle.addEventListener("click", showOptions);

    function showOptions(event) {
      event.preventDefault();

      ellipsisMenu.classList.toggle("show");
    }
  }
}

function formatDate(date) {
  if (date instanceof Date) {
    return date;
  }

  const options = {
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: "true",
  };

  console.log(date);

  const createdProductDate = new Date(date).toLocaleString("en-US", options);

  return createdProductDate;
}

function updateProduct(index) {
  temp = index;
  mood = "update";
  publishProductButton.innerHTML = "Update Product";

  removeSuccessMess();
  removeActiveTab();

  $("#tab-3").addClass("active").hide().fadeIn(1000);

  productName.value = products[index].name;
  productDescription.value = products[index].description;
  productCategory.value = products[index].category;
  productPrice.value = products[index].price;

  if (products[index].image) {
    const imgElement = document.createElement("img");
    imgElement.src = products[index].image;
    imgElement.alt = "product";

    uploadedImgContainer.innerHTML = "";
    uploadedImgContainer.appendChild(imgElement);

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
  }

  temp = index;
}

function removeProduct(index) {
  products.splice(index, 1);

  localStorage.setItem("product", JSON.stringify(products));

  fetchProducts();
}

function displayAddProductFrom() {
  removeSuccessMess();

  removeActiveTab();

  $("#tab-3").addClass("active").hide().fadeIn(1000);
}

function removeSuccessMess() {
  const successMessageContainer = document.querySelector(
    ".success-message-container"
  );
  successMessageContainer.style.display = "none";
}

function removeActiveTab() {
  AllTabs.forEach((tab) => {
    tab.classList.remove("active");
  });
}

fetchProducts();
