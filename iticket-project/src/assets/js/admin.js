import { endpoints } from "./api.js";
import controller from "./request.js";
const allEvents = document.querySelector("#allEvents");

window.addEventListener("load", async function () {
    const apiResponse = await controller.getAll(endpoints.events);
    const elements = apiResponse.data;
    let counter = 1;
    allEvents.innerHTML = "";
    elements.forEach(element => {
        if (element.id) {
            allEvents.innerHTML += `                <tr>
                    <td>${counter++}</td>
                    <td id="name">${element.name} <br>  Category: ${element.category}</td>
                    <td id="dateTime">${element.dateTime}</td>
                    <td id="venue">${element.venueName} <br> Address: ${element.venueAddress}<br> Capacity: ${element.venueCapacity}</td>
                    <td id="organizer">${element.organizer}</td>
                    <td>
                        <button class="btn btn-success btn-sm" id="ticketsAvailable">Available: ${element.ticketsAvailable}
                        </button>
                        <button class="btn btn-danger btn-sm" id="soldTickets">Sold: ${element.soldTickets}
                        </button>
                    </td>
                    <td id="price">
                        <button class="btn btn-danger btn-sm">$${element.price}
                        </button>
                    </td>
                    <td id="ageRestriction">
                        <button class="btn btn-danger btn-sm">${element.ageRestriction}
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-warning btn-sm" >
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>`
        }
    });
});

const addForm = document.querySelector("#addForm");
addForm.addEventListener("click", () => {
    window.location.replace("http://localhost:5173/newEvent.html")
})