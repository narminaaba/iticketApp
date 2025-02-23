import controller from "./request.js";
import { endpoints } from "./api.js";

const loginForm = document.querySelector("#login-form");
const loginInputs = {
    email : document.querySelector("#email"),
    password: document.querySelector("#password"),
};

loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const apiResponse = await controller.getAll(endpoints.users);
    const checkValidUser = apiResponse.data.find((x) => {
        return (
            x.email == loginInputs.email.value &&
            x.password == loginInputs.password.value
        );
    });
    const checkValidRole = apiResponse.data.find((x) => {
        return (
            x.email === "john@example.com"
        );
    });
    if (checkValidRole) {
        setTimeout(() => {
            window.location.replace("http://localhost:5173/adminpage.html")
        }, 1000);
    }
  
   else   if (checkValidUser) {
    localStorage.setItem("userID", JSON.stringify(checkValidUser.id));
    setTimeout(() => {
        window.location.replace("http://localhost:5173/user.html")
    }, 1000);
}
    else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
});