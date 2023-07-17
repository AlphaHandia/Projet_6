const form = document.querySelector('#login-form');
const errorMessage = document.querySelector('#error-message');

const forgotPasswordLink = document.createElement('a');
forgotPasswordLink.href = '#';
forgotPasswordLink.textContent = 'Mot de passe oublié';
forgotPasswordLink.style.textDecoration = 'underline';

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Empêche la soumission par défaut du formulaire

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  // Envoi des données d'authentification
  fetch('http://localhost:5678/api/users/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(response => {
      if (response.ok) {
        // Authentification réussie, rediriger vers la page d'accueil
        window.location.href = './index.html';
      } else {
        // Combinaison email/mot de passe incorrecte, afficher un message d'erreur
        alert('Identifiants incorrects');
      }
    })
    .catch(error => {
      console.error('Erreur lors de la connexion :', error);
    });
});

form.appendChild(forgotPasswordLink);