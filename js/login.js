const loginBtn = document.getElementById("login-btn");
const username = document.getElementById("username");
const password = document.getElementById("password");

loginBtn.addEventListener("click", function () {
    if (username.value === "" || password.value === "") {
        alert("Fill Username and Password!");
    }
    else {
        if (username.value === "admin" && password.value === "admin123") {
            window.location.href = "main.html";
        }
        else if (username.value !== "admin" && password.value !== "admin123") {
            alert("Incorrect Username and Password!");
        }
        else if (password.value === "admin123") {
            alert("Incorrect Username!");
        }
        else {
            alert("Incorrect Password!");
        }
    }
});