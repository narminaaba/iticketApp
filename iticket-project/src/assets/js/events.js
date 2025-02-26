import { endpoints } from "./api.js";
import controller from "./request.js";
const allEvents = document.querySelector("#allEvents");

window.addEventListener("load", async function () {
  const apiResponse = await controller.getAll(endpoints.events);
const elements= apiResponse.data;
  allEvents.innerHTML = "";
  elements.forEach(element => {
    if (element.id) {
      allEvents.innerHTML += `<div class="col-md-4 py-4" >
          <div class="card">
            <img src=${element.posterURL} class="card-img-top" style="height: 65vh;" alt="${element.name}">
          <button class="available"> ${element.ticketsAvailable} ticket</button>
            <div class="card-body">
              <h5 class="card-title">             
              <a style="text-decoration:none" href="./eventDetails.html?id=${element.id}"> ${element.name}</a> 
             <button class="favorite"> <i class="fa-regular fa-heart"></i> </button></h5>
            </div>
          </div>
        </div>`
    }
    });
});
