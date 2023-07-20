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
          fetch(`http://localhost:5678/api/works/${work.id}`, {
            method: "DELETE",
            headers: {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4OTc3NTM1NSwiZXhwIjoxNjg5ODYxNzU1fQ.qeP4-bJMNN4Gk9OrNU38d-iJ_o_yUROaLCmlGNu43-s'
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
function openForm (){
  const btnAddAndDelete = document.querySelector(".btn-add-and-delete")
  btnAddAndDelete.innerHTML="";




  // Gestion de l'envoi du formulaire
  const form = document.querySelector(".modalForm");
  form.addEventListener("submit", formValidate);
form.id = "modalForm";
form.enctype = "multipart/form-data";

let imageLabel = document.createElement("label");
imageLabel.innerHTML="Ajout photo";
imageLabel.classList = "imageLabel";
form.appendChild(imageLabel);

const imageInput = document.createElement("input");
imageInput.id = "imageInput";
imageInput.type = "file";
form.appendChild(imageInput);

let titleLabel = document.createElement("label");
titleLabel.innerHTML="Titre";
titleLabel.classList ="titleLabel";
form.appendChild(titleLabel);

const titleInput = document.createElement("input");
titleInput.id = "titleInput";
titleInput.type = "text";
titleInput.ariaLabel = "Titre";
titleInput.classList ="Input";
form.appendChild(titleInput);

let categorieLabel = document.createElement("label");
categorieLabel.innerHTML="Description";
categorieLabel.classList ="titleLabel";
form.appendChild(categorieLabel);

const categorieInput = document.createElement("input");
categorieInput.id = "descriptionInput";
categorieInput.type = "text";
categorieInput.classList ="Input";
form.appendChild(categorieInput);



const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.textContent = "Valider";
submitButton.classList = "submit-button"
form.appendChild(submitButton);

}
let addPicture = document.querySelector(".add-picture")

// Événement clic sur l'input "Ajouter une photo"
addPicture.addEventListener("click", openForm);
modalContainer.innerHTML="";

// Déclaration de la variable pour stocker l'ID
let currentId = 1;



  
function formValidate () {
  // Récupérer les valeurs du formulaire
  const title = titleInput.value;
  const description = descriptionInput.value;
  const image = imageInput.files[0];
  // Vérifier si les conditions sont remplies
  if (title && description && image) {
    // Créer un objet FormData pour envoyer les données du formulaire
    const formData = new FormData();
    formData.append("id", currentId); // Ajouter l'ID
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    // Envoyer les données via fetch
    fetch("http://localhost:5678/api/works/", {
      method: "POST",
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY4OTc2NTE1MSwiZXhwIjoxNjg5ODUxNTUxfQ.e0LdgeM-OjhzqG8iIBXtkoghpmFlfzIDbJF33TaHfrg'
       }, 
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

    // Incrémenter l'ID pour le prochain élément
    currentId++;
  } else {
    // Afficher un message d'erreur si les conditions ne sont pas remplies
    console.error("Veuillez remplir tous les champs avant de soumettre le formulaire.");
  }
};

// Evenement au clic de supprimer la galerie
const btnDeleteGallery = document.querySelector(".delete-gallery");
btnDeleteGallery.addEventListener("click", deleteGallery);

function deleteGallery() {
  console.log("delete Gallery");
}
