import { endpoints } from "./api.js";
import controller from "./request.js";

const loginRegister = document.querySelector("#login-register");
window.addEventListener("load", async function (e) {
  const userID = JSON.parse(localStorage.getItem("userID"));
  const apiUsers = await controller.getAll(endpoints.users);
  const checkValidLogin = apiUsers.data.find((x) => x.id == userID);
  if (checkValidLogin) {
    loginRegister.innerHTML = "";
    loginRegister.innerHTML += `
                 <span class=" btn btn-light nav-item">
                    <a class="sign" href="./user.html">${checkValidLogin.username}</a>
                  </span>
                  <button id="log-out" class="btn btn-dark bg-warning mx-4 nav-item" style="width: 7rem;">
                    <a class="text" href="./index.html"><i class="fa-solid fa-arrow-right-from-bracket"></i></a>
                  </button>
        `;
    const logOutBtn = document.querySelector("#log-out");
    logOutBtn.addEventListener("click", function () {
      localStorage.removeItem("userID");
      loginRegister.innerHTML = "";
      loginRegister.innerHTML += `
         <span class=" btn btn-light nav-item">
              <a class="sign" href="./register.html">Sign up</a>
            </span>
            <button  id="log-out" class="btn btn-dark bg-warning mx-4 nav-item" style="width: 7rem;">
              <a class="text" href="./login.html">Sign in</a>
            </button>
        `;
      setTimeout(() => {
        window.location.replace("http://localhost:5173/index.html")
      }, 1000);
    })
  }
})
