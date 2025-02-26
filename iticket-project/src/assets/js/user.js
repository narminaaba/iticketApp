import controller from "./request.js";
import { endpoints } from "./api.js";
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
const userDetails = document.querySelector("#userDetails");


window.addEventListener("load", async function (e) {
    const apiUsers = await controller.getAll(endpoints.users);
    const checkUser = apiUsers.data.find((x) => x.id == userId);
    userDetails.innerHTML = "";

    if (checkUser) {
        userDetails.innerHTML += `<div class="col-md-4" >
            <div class="card" >
            <img  src=${checkUser.profilePictureURL}  style="height:30vh" alt="${checkUser.username}">
            </div>
        </div>

        <div class="col-md-7">
            <div class="card" style="height:65vh">
                <div class="card-body">
                    <form>
                            <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" name="username" id="username"  value= "${checkUser.username}" >
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" name="email" id="email" value="${checkUser.email}">
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" name="password" value="${checkUser.password}">
                        </div>
                        <div class="mb-3">
                            <label for="accountCreationDate" class="form-label">Account Creation Date</label>
                            <input type="text" class="form-control" name="accountCreationDate" value="${checkUser.accountCreationDate}" disabled >
                        </div>
                            <button type="button" id="balance" class="btn btn-success">Balance: $${checkUser.balance}</button>
                            <button type="button" id="totalSpentMoney" class="btn btn-danger">Total spent money: $${checkUser.totalSpentMoney}</button>
                           <br><br>
                            <button type="button" id="editProfile" class="btn btn-warning">Edit Profile</button>
                    </form>
                </div>
            </div>
        </div>`
    }
    const editProfile = document.querySelector("#editProfile");
    const profileInputs = {
        username: document.querySelector("#username"),
        email: document.querySelector("#email"),
    };
    editProfile.addEventListener("click", async function (e) {
        const editUser = {
            username: profileInputs.username.value.trim(),
            email: profileInputs.email.value.trim(),
        };
        const updateOneResponse = await controller.patch(endpoints.users + `${userId}`, editUser);
        if (updateOneResponse.data) {
            Swal.fire({
                title: "Good job!",
                text: "You added your profile",
                icon: "success"
            });
            window.location.replace("http://localhost:5173/user.html")
        }
    })
})
