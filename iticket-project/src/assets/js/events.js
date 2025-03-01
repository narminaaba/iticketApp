import { endpoints } from "./api.js";
import controller from "./request.js";
import { BasketItems } from "./class.js";

const allEvents = document.querySelector("#allEvents");
let elements = [];

let basketApp = undefined;

window.addEventListener("load", async function () {
  const apiResponse = await controller.getAll(endpoints.events);
  elements = apiResponse.data;
  basketApp = new BasketItems();
  function renderCategoryList(arr) {
    allEvents.innerHTML = "";
    arr.forEach(element => {
      allEvents.innerHTML += `<div class="col-md-4 py-4" >
          <div class="card">
            <img src=${element.posterURL} class="card-img-top" style="height: 65vh;" alt="${element.name}">
          <button class="btn btn-warning nav-item" id="price"> $${element.price} </button> 
          <button class="btn btn-warning nav-item" id="available"> ${element.ticketsAvailable} ticket</button> 
            <div class="card-body">
              <h5 class="card-title">             
              <a style="text-decoration:none" href="./eventDetails.html?id=${element.id}"> ${element.name}</a> 
            <button class="btn btn-primary add-to-basket" data-id="${element.id}"><i class="fa-solid fa-cart-shopping"></i></button>
            </div>
          </div>
        </div>`
    });
  }
  renderCategoryList(elements);

  const searchInp = document.querySelector("#search");
  searchInp.addEventListener("keyup", function (e) {
    const searchQuery = e.target.value.trim().toLowerCase();
    const searchedCategories = elements.filter((x) => {
      return x.name.toLowerCase().trim().includes(searchQuery);
    });
    renderCategoryList(searchedCategories);
  });

  const sortInp = document.querySelector("#sort");
  sortInp.addEventListener("change", function () {
    const sortedCategory = sortInp.value;
    if (sortedCategory == "expensive to cheap") {
      const sortedCategories = [...elements.sort((x, y) => y.price - x.price)]
      renderCategoryList(sortedCategories);
    }
    else if (sortedCategory == "cheap to expensive") {
      const sortedCategories = [...elements.sort((x, y) => x.price - y.price)]
      renderCategoryList(sortedCategories);
    }
  })
const basketButtons = Array.from(document.querySelectorAll(".add-to-basket"));
basketButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const newBasketItem = { id: this.getAttribute("data-id"), quantity: 1 };
    const result = basketApp.add(newBasketItem);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: result.message,
      showConfirmButton: false,
      timer: 1500,
    });
  });
});
})
