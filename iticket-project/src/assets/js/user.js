import controller from "./request.js";
import { endpoints } from "./api.js";

const editProfile = document.querySelector("#editProfile");
const profileInputs = {
    username: document.querySelector("#username"),
    email: document.querySelector("#email"),
    // password: document.querySelector("#password"),
    // profilePictureURL: document.querySelector("#profilePictureURL")
};
window.addEventListener("load", async function (e) {
    const userID = JSON.parse(localStorage.getItem("userID"));
    const apiUsers = await controller.getAll(endpoints.users);
    const checkValidLogin = apiUsers.data.find((x) => x.id == userID);
    if (checkValidLogin) {
        profileInputs.username.value = checkValidLogin.username;
        profileInputs.email.value = checkValidLogin.email;
        // profileInputs.password.value = checkValidLogin.password;
        // profileInputs.profilePictureURL.value = checkValidLogin.profilePictureURL;
    
    editProfile.addEventListener("click", async  function () {
        const editUser = {
            username: profileInputs.username.value.trim(),
             email: profileInputs.email.value.trim(),
            // password:  profileInputs.password.value.trim(),
            // profilePictureURL:  profileInputs.profilePictureURL.value.trim(),
         };
    const postResponse = await controller.post(endpoints.users, editUser);
    if (postResponse.data) {
        setTimeout(() => {
            window.location.replace("http://localhost:5173/user.html")
        }, 1000);
    }
}
)};
})
