import controller from "./request.js";
import { endpoints } from "./api.js";
import { BasketItems } from "./class.js";

const tBody = document.querySelector("tbody");
const total = document.querySelector(".total");
const orderBtn = document.querySelector(".order");
let basketApp;
document.addEventListener("DOMContentLoaded", async function () {
    basketApp = new BasketItems();
    let counter = 1;
    let priceSum = 0;
    const apiResponse = await controller.getAll(endpoints.events);

    basketApp.basketItems.forEach((basketItem) => {
        const event = apiResponse.data.find((x) => x.id == basketItem.id);
        tBody.innerHTML += `
       <tr data-id="${event.id}">
                                    <th scope="row">${counter++}</th>
                                    <td>${event.name}</td>
                                    <td>
                                        <img width="5vw" src="${event.posterUrl}" alt="${event.name}">
                                    </td>
                                    <td>${event.price}</td>
                                    <td>x${basketItem.quantity}</td>
                                    <td>${event.price * basketItem.quantity}</td>
                                     <td><button class="btn btn-outline-danger remove"><i class="fa-solid fa-trash"></i></button></td>
                                </tr>
    `;
        priceSum += event.price * basketItem.quantity;
    });
    total.textContent = priceSum.toFixed(2) + "$";

    const removeButtons = Array.from(document.querySelectorAll(".remove"));
    removeButtons.forEach((removeBtn) => {
        removeBtn.addEventListener("click", function () {
            const id = this.parentElement.parentElement.getAttribute("data-id");
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    basketApp.removeBasketItem(id);
                    this.parentElement.parentElement.remove();
                    total.textContent =
                        ( Number(total.textContent.split("$")[0]) -
                            this.parentElement.previousElementSibling.previousElementSibling
                                .previousElementSibling.textContent
                        ).toFixed(2) + "$";
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                    });
                }
            });
        });
    });
});

orderBtn.addEventListener("click", function () {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            tBody.innerHTML = "";
            total.textContent = "no item in basket!";
            basketApp.clear();
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
            });
        }
    });
});