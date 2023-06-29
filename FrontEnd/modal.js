
// Sélection des éléments du DOM
const modal = document.getElementById("modal");
const btnOpenModal = document.getElementById("btnOpenModal");
const closeModal = document.getElementsByClassName("close")[0];

// Fonction pour ouvrir la modale
function openModal() {
  modal.style.display = "block";
}

// Fonction pour fermer la modale
function closeModal() {
  modal.style.display = "none";
}

// Événement clic sur le bouton pour ouvrir la modale
btnOpenModal.addEventListener("click", openModal);

// Événement clic sur la croix pour fermer la modale
closeModal.addEventListener("click", closeModal);

// Événement clic en dehors de la modale pour la fermer
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    closeModal();
  }
});