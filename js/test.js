// const api = "http://127.0.0.1:5000/api/products";

// // fetch(api)
// //   .then((response) => console.log(response.json()))
// //   // .then((response) => console.log(response))
// //   .then((data) => console.log(data));

// console.log("from desktop");

// async function getData() {
//   const response = await fetch(api);
//   const data = await response.json();

//   return data;
// }

// async function displayData() {
//   const apiData = await getData();
//   console.log(apiData)
//   const productsContent = document.querySelector(".products-content");

//   let html = "";

//   for (let i = 0; i < apiData.length; i++) {
//     html += `
//         <div class="col-lg-4 col-md-4 col-sm-6 mb-4">
//           <div class="box" onclick="openProductPage('${apiData[i].id}')">
//             <div class="product-header">
//               <h2>${apiData[i].name}</h2>
//               <p>${apiData[i].description} </p>
//             </div>

//             <div class="product-footer">

//               <div class="product-price">
//                 <p>${apiData[i].price}$</p>
//                 <i class="fa-solid fa-cart-shopping"></i>
//               </div>

//             </div>
//           </div>
//         </div>
//       `;
//   }

//   productsContent.innerHTML = `<div class="row">${html}</div>`;
// }

// displayData()

const newProduct = {
  productOne:{

    userId: 1,
    id: 5,
    title: "hello fetch api",
  },
  productTwo:{
    userId: 2,
    id: 8,
    title: "hello fetch api2",
  }
}

fetch("https://jsonplaceholder.typicode.com/todos/5", {
  method: "PUT",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(newProduct),
})
  .then((response) => response.json())
  .then((data) => console.log(data));
