import controller from "./request.js";
import { endpoints } from "./api.js";

const adminForm = document.querySelector(".admin-form");
const adminInputs = {
    name: document.querySelector("#eventName"),
    dateTime: document.querySelector("#dateTime"),
    venue: document.querySelector("#venue"),
    organizer: document.querySelector("#organizer"),
    ticketsAvailable: document.querySelector("#ticketsAvailable"),
    price: document.querySelector("#price"),
    ageRestruction: document.querySelector("#ageRestruction"),
};

adminForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = adminInputs.name.value.trim();
    const dateTime = adminInputs.dateTime.value.trim();
    const venue = adminInputs.venue.value.trim();
    const organizer = adminInputs.organizer.value.trim();
    const ticketsAvailable = adminInputs.ticketsAvailable.value.trim();
    const price = adminInputs.price.value.trim();
    const ageRestruction = adminInputs.ageRestruction.value.trim();
    
    const apiResponse = await controller.getAll(endpoints.events);
    const dublicateEvent = apiResponse.data.find(
        (x) =>
            x.name === adminInputs.name.value
    );
    if (dublicateEvent) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
        });
        return;
    }
    else {
        const newEvent = {
            name,
            dateTime,
            venue,
            organizer,
            ticketsAvailable,
            price,
            ageRestruction,
        };
        const postResponse = await controller.post(endpoints.events, newEvent);
        if (postResponse.data) {
            Swal.fire({
                title: "Good job!",
                text: "You added your profile",
                icon: "success"
            });
            setTimeout(() => {
                window.location.replace("http://localhost:5173/adminpage.html")
            }, 1500);
        }
    }
})