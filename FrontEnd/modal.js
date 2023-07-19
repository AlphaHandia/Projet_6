// Sélection des éléments du DOM
let modal = document.querySelector("#modal1");
const btnOpenModal = document.querySelector(".btnOpenModal");
const btncloseModal = document.querySelector(".close")
const modalContainer = document.querySelector(".modal-container");
const galleryImages = document.querySelectorAll("#portfolio .gallery  img");

// Fonction pour ouvrir la modale
function openModal() {
  modal.style.display = "flex";
  modalContainer.innerHTML = ""; // Effacer le contenu précédent de la modale

  // Ajouter les images de la galerie à la modale
  galleryImages.forEach(function (image) {
    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt;
    modalContainer.appendChild(img);
  });
  

}
// Événement clic sur le bouton pour ouvrir la modale
btnOpenModal.addEventListener("click", openModal);

// Fonction pour fermer la modale
function closeModal() {
  modal.style.display = "none";
}


// Événement clic sur la croix pour fermer la modale
btncloseModal.addEventListener("click", closeModal);
// Événement clic en dehors de la modale pour la fermer
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});




