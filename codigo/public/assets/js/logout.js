function logout() {

    alert("Você será redirecionado para a página de login.");


    window.location.href = "http://localhost:3000/modulos/login/login.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.querySelector(".logout-button");
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));


    if (!loggedInUser && logoutButton) {

        logoutButton.style.display = "none";
    } else if (logoutButton) {

        logoutButton.addEventListener("click", logout);
    }


    if (!loggedInUser || !loggedInUser.id) {
        alert("Usuário não autenticado.");
        window.location.href = "http://localhost:3000/modulos/login/login.html";
        return;
    }
});
