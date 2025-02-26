import { endpoints } from "./api.js";
import controller from "./request.js";

const loginRegister = document.querySelector(".login-register");
window.addEventListener("load", async function (e) {
  const userID = JSON.parse(localStorage.getItem("userID"));
  const apiUsers = await controller.getAll(endpoints.users);
  const checkValidLogin = apiUsers.data.find((x) => x.id == userID);
  const isAdmin = checkValidLogin.email === "john@example.com";
  const checkValidRole = isAdmin ? "./adminpage.html" : `./user.html?id=${checkValidLogin.id}`;

  if (checkValidLogin) {
    loginRegister.innerHTML = "";
    loginRegister.innerHTML += `
              <div class="navbar-nav ms-auto">
            <a class="btn btn-light nav-item text-primary "  href="./index.html">Home</a>
            <a class="btn btn-light nav-item mx-1 text-primary"  href="./events.html">All Events</a>                  
                <a class="btn btn-light nav-item text-primary" style="text-decoration:none;" href="${checkValidRole}">
                ${checkValidLogin.username}
              </a>
              <a id="log-out" class="btn btn-light mx-1 nav-item text-primary" style="
    border: none;" href="./index.html">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
              </a>
              </div>
        `;
    const logOutBtn = document.querySelector("#log-out");
    logOutBtn.addEventListener("click", function () {
      localStorage.removeItem("userID");
      loginRegister.innerHTML = "";
      loginRegister.innerHTML += `
                <div class="navbar-nav ms-auto">
            <a class="btn btn-light nav-item text-primary "  href="./index.html">Home</a>
            <a class="btn btn-light nav-item mx-1 text-primary"  href="./events.html">All Events</a>
              <a class="btn btn-light nav-item text-primary"  href="./register.html">
                <i class="fa-solid fa-user-plus"></i>
              </a>
              <a id="log-out" class="btn btn-light mx-1 nav-item text-primary" style="
    border: none;" href="./login.html">
                <i class="fa-solid fa-arrow-right-to-bracket"></i>
              </a>
              </div>
        `;
      setTimeout(() => {
        window.location.replace("http://localhost:5173/index.html")
      }, 1000);
    })
  }
})
