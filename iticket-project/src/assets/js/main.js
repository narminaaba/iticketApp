import { endpoints } from "./api.js";
import controller from "./request.js";
const selection = document.querySelector("#selection");

window.addEventListener("load", async function () {
  const apiResponse = await controller.getAll(endpoints.events);
  const elements = apiResponse.data;
  const lastThreeId = elements.slice(-3);
  selection.innerHTML = "";

  lastThreeId.forEach(element => {
    selection.innerHTML += `<div class="col-md-4" >
          <div class="card">
            <img src=${element.posterURL} class="card-img-top"   style="height: 75vh;" alt="${element.name}">
            <div class="card-body">
              <h5 class="card-title">
             <a style="text-decoration:none" href="./eventDetails.html?id=${element.id}"> ${element.name}</a> 
             <button class="favorite"> <i class="fa-regular fa-heart"></i> </button>
        </h5>
            </div>
          </div>
        </div>`;
  })
  const favorites = Array.from(document.querySelectorAll('.favorite'));
  favorites.forEach((fav) => {
    fav.addEventListener('click', function () {
      if (fav.style.color !== "red") {
        fav.style.color = "red";
      }
      else {
        fav.style.color = "";
      }
    });
  })
});
