let form = document.querySelector("#login-form");
const errorMessage = document.querySelector("#error-message");

const forgotPasswordLink = document.createElement("a");
forgotPasswordLink.href = "#";
forgotPasswordLink.textContent = "Mot de passe oublié";
forgotPasswordLink.style.textDecoration = "underline";

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche la soumission par défaut du formulaire

  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const email = emailInput.value;
  const password = passwordInput.value;

  // Envoi des données d'authentification
  fetch("http://localhost:5678/api/users/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      console.log("je suis la");
      if (response.ok) {
        // Authentification réussie
        return response.json(); // Utilisez response.json() pour extraire les données
      } else {
        errorMessage.style.display = "flex";
        emailInput.style.border = "2px solid red";
        passwordInput.style.border = "2px solid red";
      }
    }) // récupération du token et le stocké dans localStorage 
    .then((data) => {
      window.localStorage.setItem("token", data.token);
      console.log(data.token);
      location.assign("index.html?authenticated=true");
    })
    .catch((error) => {
      console.error("Erreur lors de la connexion :", error);
    });
});
form.appendChild(forgotPasswordLink);
