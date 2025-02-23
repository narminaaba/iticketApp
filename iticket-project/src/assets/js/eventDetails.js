import controller from "./request.js";
import { endpoints } from "./api.js";
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('id');
const eventDetails = document.querySelector("#eventDetails");

window.addEventListener("load", async function (e) {
    const apiUsers = await controller.getAll(endpoints.events);
    const checkEvent = apiUsers.data.find((x) => x.id == eventId);
    eventDetails.innerHTML = "";

    if (checkEvent) {
        eventDetails.innerHTML += `<div class="col-md-5" >
            <div class="card" style="height:74vh">
            <img  src=${checkEvent.posterURL}  style="height:40.5vh" alt="${checkEvent.category}"><br>
               <span style="margin:3px"> <button style="border-radius:7px;">${checkEvent.ageRestriction}</button></span>
                    <div class="card-body text-center">
                    <br>
                    <h5 class="card-title">${checkEvent.name}</h5>
                    <p class="card-text">Category: ${checkEvent.category}</p>
                    <p class="text-muted">Date time: ${checkEvent.dateTime}</p>
                </div>
            </div>
        </div>

        <div class="col-md-7">
            <div class="card" style="height:74vh">
                <div class="card-body">
                    <form>
                            <div class="mb-3">
                            <label for="text" class="form-label">Organizer</label>
                            <input type="text" class="form-control" value= "${checkEvent.organizer}" disabled >
                        </div>
                        <div class="mb-3">
                            <label for="venueName" class="form-label">Venue Name</label>
                            <input type="text" class="form-control" value="${checkEvent.venueName}" disabled >
                        </div>
                        <div class="mb-3">
                            <label for="venueAddress" class="form-label">Venue Address</label>
                            <input type="text" class="form-control" value="${checkEvent.venueAddress}" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="text" class="form-label">Description</label>
                            <input type="text" class="form-control" value="${checkEvent.description}" disabled >
                        </div>
                        <div class="mb-3">
                            <label for="venueCapacity" class="form-label">Venue Capacity: ${checkEvent.venueCapacity}</label>
                        </div>
                            <div class="mb-3">
                            <label for="text" class="form-label">Price: ${checkEvent.price}$</label>
                        </div>
                            <label for="text" class="form-label">Duration: ${checkEvent.duration}</label>
                    </form>
                </div>
            </div>
        </div>`
    }
})
