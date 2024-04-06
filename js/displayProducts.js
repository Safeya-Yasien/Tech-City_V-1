const productsAddProductButton = document.querySelector(
  "#products-add-product"
);
const AllTabs = document.querySelectorAll(".tab");
let temp;

productsAddProductButton.addEventListener("click", displayAddProductFrom);

async function fetchProducts() {
  const response = await fetch(api);
  const apiData = await response.json();

  const localStorageData = JSON.parse(localStorage.getItem("product")) || [];
  const mergedData = localStorageData.concat(apiData);
  displayProducts(mergedData);
}

function displayProducts(apiData) {
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
        <a class="product-img" href="#">
        <img src="${apiData[i].image}" alt='product'/>
        </a>
    </td>
    <td>
        <a class="product-name" href="#">
        ${apiData[i].title}
        </a>
    </td>
    <td class='product-price-update'>${apiData[i].price}</td>
    <td class='product-category-update'>${apiData[i].category}</td>
    <td>Nov 12, 10:45 PM</td>
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

function removeProduct(index) {
  event.preventDefault();
  const localStorageData = JSON.parse(localStorage.getItem("product")) || [];

  localStorageData.splice(index, 1);

  localStorage.setItem("product", JSON.stringify(localStorageData));

  fetchProducts();
}

function updateProduct(index) {
  temp = index;
  mood = "update";
  publishProductButton.innerHTML = "Update Product";

  removeSuccessMess();
  removeActiveTab();

  $("#tab-3").addClass("active").hide().fadeIn(1000);

  productTitle.value = products[index].title;
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
