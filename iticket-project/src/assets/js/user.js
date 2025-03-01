import controller from "./request.js";
import { endpoints } from "./api.js";
const urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get('id');
const userDetails = document.querySelector("#userDetails");

window.addEventListener("load", async function (e) {
    const apiUsers = await controller.getAll(endpoints.users);
    const checkUser = apiUsers.data.find((x) => x.id == userId);
    userDetails.innerHTML = "";

    if (checkUser) {
        userDetails.innerHTML += ` <div class="row" >
        <div class="col-md-4" >
            <div class="card" >
            <img  src=${checkUser.profilePictureURL}  style="height:30vh" alt="${checkUser.username}">
            </div>
        </div>

        <div class="col-md-7">
            <div class="card">
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
                            <input type="password" class="form-control" name="password" id="password" value="${checkUser.password}">
                        </div>
                        <div class="mb-3">
                            <label for="accountCreationDate" class="form-label">Account Creation Date</label>
                            <input type="text" class="form-control" name="accountCreationDate" id="accountCreationDate" value="${checkUser.accountCreationDate}" disabled >
                        </div>
                            <button type="button" id="balance" class="btn btn-success">Balance: $${checkUser.balance}</button>
                            <button type="button" id="totalSpentMoney" class="btn btn-danger">Total spent money: $${checkUser.totalSpentMoney}</button>
                           <br><br>
                            <button type="button" id="editProfile" class="btn btn-warning">Edit Profile</button>
                            <button data-id=${checkUser.id} type="button" id="deleteOne" class="btn btn-warning">Delete Profile</button>

                    </form>
                </div>
            </div>
             <div>
        </div>`
    }


    // const editProfile = document.querySelector("#editProfile");

    // const profileInputs = {
    //     username: document.querySelector("#username"),
    //     email: document.querySelector("#email"),
    // };
    // const editUser = {
    //     username: profileInputs.username.value.trim(),
    //     email: profileInputs.email.value.trim(),
    // };
    // const postResponse = await controller.post(endpoints.users, editUser);
    // if (postResponse.data) {
    //     localStorage.setItem("userId", JSON.stringify(checkUser.id));
    // profileInputs.username.value = checkUser.username;
    // profileInputs.email.value = checkUser.email;

    // editProfile.addEventListener("submit", async function (e) {
    //     e.preventDefault();
    //     const updateOneResponse = await controller.updateOne(endpoints.users + `${userId}`, editUser);
    //     if (updateOneResponse.data) {
    //         Swal.fire({
    //             title: "Good job!",
    //             text: "You changed your profile",
    //             icon: "success"
    //         });
    //         window.location.replace(`http://localhost:5173./user.html?id=${checkUser.id}`)
    //     }

    // })
    // }
    // const deleteButtons = document.querySelectorAll("#deleteOne");

    // deleteButtons.forEach((deleteButton) => {
    //     deleteButton.addEventListener("click", async function () {
    //         const id = this.getAttribute("data-id");
    //         const deleteOneResponse = await controller.deleteOne(endpoints.users + `/${id}`);
    //         if (deleteOneResponse) {
    //             Swal.fire({
    //                 title: "Are you sure?",
    //                 text: "You won't be able to revert this!",
    //                 icon: "warning",
    //                 showCancelButton: true,
    //                 confirmButtonColor: "#3085d6",
    //                 cancelButtonColor: "#d33",
    //                 confirmButtonText: "Yes, delete it!"
    //             }).then((result) => {
    //                 if (result.isConfirmed) {
    //                     Swal.fire({
    //                         title: "Deleted!",
    //                         text: "Your file has been deleted.",
    //                         icon: "success"
    //                     });
    //                 }
    //             });
    //             this.parentElement.parentElement.parentElement.remove();
    //             localStorage.removeItem(`${userId}`);
    //         }
    //     })
    // });

});