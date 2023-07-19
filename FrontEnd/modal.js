// Sélection des éléments du DOM
const modal = document.querySelector("#modal1");
const btnOpenModal = document.querySelector(".btnOpenModal");
const btncloseModal = document.querySelector(".close");
const modalContainer = document.querySelector(".modal-container");
const gallery = document.querySelector("#portfolio .gallery");

// Fonction pour ouvrir la modale
function openModal() {
  modal.style.display = "flex";
  modalContainer.innerHTML = ""; // Effacer le contenu précédent de la modale

  // Récupérer les données des works depuis l'API
  fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((works) => {
      works.forEach((work) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        const deleteButton = document.createElement("button");
        const deleteIcon = document.createElement("i");

        img.src = work.imageUrl;
        img.alt = work.title;
        figcaption.textContent = "editer";
        deleteIcon.className = "fa-solid fa-trash-can";
        deleteButton.appendChild(deleteIcon);

        figure.appendChild(img);
        figure.appendChild(figcaption);
        figure.appendChild(deleteButton);
        modalContainer.appendChild(figure);

        // Gestionnaire d'événements de suppression
        deleteButton.addEventListener("click", function () {
          const figure = deleteButton.closest("figure");
          const imageSrc = figure.querySelector("img").src;
          // Envoi de la requête de suppression de l'image
          fetch("http://localhost:5678/api/works/${works.id}", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageUrl: imageSrc }),
          
          })
            .then(function (response) {
              if (response.ok) {
                // Le travail a été supprimé avec succès, retirez-le du DOM
                figure.remove();
              } else {
                // Gérer les erreurs de suppression
                console.error("Erreur lors de la suppression du travail");
              }
            })
            .catch(function (error) {
              console.error("Erreur lors de la suppression du travail :", error);
            });
        });
      });
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des works depuis l'API :", error);
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

// Gestion de l'envoi du formulaire
const form = document.createElement("form");
form.id = "modalForm";

const titleInput = document.createElement("input");
titleInput.id = "titleInput";
titleInput.type = "text";
titleInput.placeholder = "Titre";
form.appendChild(titleInput);

const descriptionInput = document.createElement("input");
descriptionInput.id = "descriptionInput";
descriptionInput.type = "text";
descriptionInput.placeholder = "Description";
form.appendChild(descriptionInput);

const imageInput = document.createElement("input");
imageInput.id = "imageInput";
imageInput.type = "file";
form.appendChild(imageInput);

const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.textContent = "Ajouter";
form.appendChild(submitButton);

modalContainer.appendChild(form);

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Empêche le rechargement de la page

  // Récupérer les valeurs du formulaire
  const title = titleInput.value;
  const description = descriptionInput.value;
  const image = imageInput.files[0];

  // Créer un objet FormData pour envoyer les données du formulaire
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("image", image);

  // Envoyer les données via fetch
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
  })
    .then(function (response) {
      if (response.ok) {
        // Le travail a été ajouté avec succès, actualiser la page pour afficher le nouveau travail
        location.reload();
      } else {
        // Gérer les erreurs d'ajout
        console.error("Erreur lors de l'ajout du travail");
      }
    })
    .catch(function (error) {
      console.error("Erreur lors de l'ajout du travail :", error);
    });
});
// Evenement au click de supprimer la gallerie//
const btnDeleteGallery = document.querySelector(".delete-gallery");
btnDeleteGallery.addEventListener("click", deleteGallery);
function deleteGallery(){
  console.log("delete Gallery");
}
