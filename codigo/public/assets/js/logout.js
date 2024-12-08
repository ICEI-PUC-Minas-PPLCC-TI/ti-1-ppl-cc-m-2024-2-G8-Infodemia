
function logout() {

    localStorage.removeItem("loggedInUser");


    window.location.href = "http://localhost:3000/modulos/login/login.html";
}


document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logoutButton");

    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }
});
