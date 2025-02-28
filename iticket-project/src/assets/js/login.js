import controller from "./request.js";
import { endpoints } from "./api.js";

const loginForm = document.querySelector("#login-form");
const loginInputs = {
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
};
loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const apiResponse = await controller.getAll(endpoints.users);
    const checkValidUser = apiResponse.data.find((x) => {
        return (
            x.email === loginInputs.email.value &&
            x.password === loginInputs.password.value
        );
    });

    if (checkValidUser) {
        localStorage.setItem("userID", JSON.stringify(checkValidUser.id));
        const isAdmin = checkValidUser.email === "john@example.com";
        const checkValidRole = isAdmin ? "./adminpage.html" : `./user.html?id=${checkValidUser.id}`;
        setTimeout(() => {
            window.location.replace(checkValidRole);
        }, 1000);
    }

    else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Wrong email or password",
        });
    }
});