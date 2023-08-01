const form = document.querySelector("#login-form");
const errorMessage = document.querySelector("#error-message");

const forgotPasswordLink = document.createElement("a");
forgotPasswordLink.href = "#";
forgotPasswordLink.textContent = "Mot de passe oublié";
forgotPasswordLink.style.textDecoration = "underline";

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche la soumission par défaut du formulaire

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  // Envoi des données d'authentification
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.ok) {
        // Authentification réussie
        return response.json(); // Utilisez response.json() pour extraire les données
      } else {
        throw new Error("Identifiants incorrects");
      }
    }) // récupération du token et le stocké dans localStorage et sessionStorage
    .then((data) => {
      let token = "";
      window.sessionStorage.token = data.token;
      window.localStorage.setItem("token", token);
      console.log(data.token);
      data.token.export;
      location.assign("index.html");
    })
    .catch((error) => {
      console.error("Erreur lors de la connexion :", error);
    });
});
form.appendChild(forgotPasswordLink);
