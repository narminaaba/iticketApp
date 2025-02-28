import { endpoints } from "./api.js";
import controller from "./request.js";
import { BasketItems } from "./class.js";

const selection = document.querySelector("#selection");
const badge = document.querySelector(".badge");

let basketApp = undefined;

window.addEventListener("load", async function () {
  const apiResponse = await controller.getAll(endpoints.events);
  const elements = apiResponse.data;
  basketApp = new BasketItems();
  const lastThreeId = elements.slice(-3);
  selection.innerHTML = "";

  lastThreeId.forEach(element => {
    selection.innerHTML += `<div class="col-md-4" >
          <div class="card">
            <img src=${element.posterURL} class="card-img-top"   style="height: 75vh;" alt="${element.name}">
            <div class="card-body">
              <h5 class="card-title">
             <a style="text-decoration:none" href="./eventDetails.html?id=${element.id}"> ${element.name}</a> 
            <button class="btn btn-primary add-to-basket" data-id="${element.id}"><i class="fa-solid fa-cart-shopping"></i></button>
        </h5>
            </div>
          </div>
        </div>`;
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
      if (result.isNew) {
        badge.textContent = Number(badge.textContent) + 1;
      }
    });
  });
});
