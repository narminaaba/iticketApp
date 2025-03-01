import controller from "./request.js";
import { endpoints } from "./api.js";

const registerForm = document.querySelector("#register");
const registerInputs = {
    username: document.querySelector("#username"),
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
    confirmPassword: document.querySelector("#confirmPassword"),
    role: document.querySelector("#role"),
};

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const apiResponse = await controller.getAll(endpoints.users);
    const dublicateUser = apiResponse.data.find(
        (x) =>
            x.username == registerInputs.username.value ||
            x.email == registerInputs.email.value
    );
    const wrongPassword =
        registerInputs.confirmPassword.value !== registerInputs.password.value;
    if (dublicateUser) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Wrong username or password!",
        });
        return;
    } else if (wrongPassword) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Wrong password!",
        });
        return;
    } else {
        const newUser = {
            role: registerInputs.role.value.trim(),
            username: registerInputs.username.value.trim(),
            email: registerInputs.email.value.trim(),
            password: registerInputs.password.value.trim(),
        };

        const postResponse = await controller.post(endpoints.users, newUser);
        if (postResponse.data) {
            Swal.fire({
                title: "Good job!",
                text: "You added your profile",
                icon: "success"
            });
            setTimeout(() => {
                window.location.replace("http://localhost:5173/login.html")
            }, 1500);
        }
    }
})