import controller from "./request.js";
import { endpoints } from "./api.js";
const urlParams = new URLSearchParams(window.location.search).get('id');

const editProfile = document.querySelector("#editProfile");
const profileInputs = {
    username: document.querySelector("#username"),
    email: document.querySelector("#email"),
    profilePictureURL: document.querySelector("#profilePictureURL"),
    balance: document.querySelector("#balance"),
    totalSpentMoney: document.querySelector("#totalSpentMoney"),
};
document.addEventListener("DOMContentLoaded", async function (e) {
    // const userID = JSON.parse(localStorage.getItem("userID"));
    const apiUsers = await controller.getAll(endpoints.users);
    const checkValidLogin = apiUsers.data.find((x) => x.id === urlParams);
    if (checkValidLogin) {
        profileInputs.username.value = checkValidLogin.username;
        profileInputs.email.value = checkValidLogin.email;
        profileInputs.profilePictureURL.value = checkValidLogin.profilePictureURL;
        profileInputs.balance.value = checkValidLogin.balance;
        profileInputs.totalSpentMoney.value = checkValidLogin.totalSpentMoney;

        editProfile.addEventListener("click", async function (e) {
            const editUser = {
                username: profileInputs.username.value.trim(),
                email: profileInputs.email.value.trim(),
                profilePictureURL: profileInputs.profilePictureURL.value.trim(),
                balance: profileInputs.balance.value.trim(),
                totalSpentMoney: profileInputs.totalSpentMoney.value.trim(),
            };
            const updateOneResponse = await controller.put(endpoints.users + `/${userID}`, editUser);
            if (updateOneResponse.data) {
                Swal.fire({
                    title: "Good job!",
                    text: "You added your profile",
                    icon: "success"
                });
                window.location.replace("http://localhost:5173/login.html")
            }
        }
        )
    }
})
