let token = window.sessionStorage.token;
const modal = document.querySelector("#modal1");
const btnOpenModal = document.querySelector(".btnOpenModal");
const btncloseModal = document.querySelector(".close");
const modalContainer = document.querySelector(".modal-container");

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
          fetch(`http://localhost:5678/api/works/${work.id}/`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${window.sessionStorage.token} `,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageUrl: imageSrc }),
          })
            .then(function (response) {
              if (window.sessionStorage.token && response.ok) {
                // Le travail a été supprimé avec succès, retirez-le du DOM
                console.log(token);
                console.log("ok pour destruction");
                figure.remove();
              } else {
                // Gérer les erreurs de suppression
                console.error("Erreur lors de la suppression du travail");
              }
            })
            .catch(function (error) {
              console.error(
                "Erreur lors de la suppression du travail :",
                error
              );
            });
        });
      });
    })
    .catch((error) => {
      console.error(
        "Erreur lors de la récupération des works depuis l'API :",
        error
      );
    });
}

// Événement clic sur le bouton pour ouvrir la modale
btnOpenModal.addEventListener("click", openModal);

let modalContentForm = document.querySelector(".modal-content form");
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

async function openForm() {
  const btnAddAndDelete = document.querySelector(".btn-add-and-delete");
  btnAddAndDelete.style.display = "none";

  const form = document.querySelector(".modalForm");

  form.id = "modalForm";
  form.enctype = "multipart/form-data";
  

  let iconArrow = document.createElement("i");
  iconArrow.className = "fa-solid fa-arrow-left";
  form.appendChild(iconArrow);
  iconArrow.addEventListener("click", closeForm);

  function closeForm() {
 
    form.innerHTML="";
      btnAddAndDelete.style.display ="flex";
    modalContainer.style.display = "flex";
     }

  let formLabel = document.createElement("h2");
  formLabel.innerHTML = "Ajout photo";
  formLabel.classList = "formLabel";
  form.appendChild(formLabel);

  let iconImage = document.createElement("i");
  iconImage.className = "fa-regular fa-image fa-2xl";

  form.appendChild(iconImage);

  let backgroundLabel = document.createElement("label");
  backgroundLabel.innerText = "";
  backgroundLabel.classList = "backgroundLabel";
  form.appendChild(backgroundLabel);

  let imageLabel = document.createElement("label");
  imageLabel.innerText = " + Ajouter  photo";
  imageLabel.classList = "imageLabel";
  form.appendChild(imageLabel);

  let subtitleImageLabel = document.createElement("p");
  subtitleImageLabel.innerText = "jpg,png : 4mo max";
  subtitleImageLabel.classList = "subtitleImageLabel";
  form.appendChild(subtitleImageLabel);

  let imageInput = document.createElement("input");
  imageInput.id = "imageInput";
  imageInput.type = "file";
  imageInput.accept = "image/jpeg, image/png"; // Définir les types de fichiers acceptés
  imageInput.classList = "imageInput";
  form.appendChild(imageInput);

  const previewImage = document.createElement("img");
previewImage.id = "previewImage";
previewImage.src = ""; // L'image source sera définie lorsque l'utilisateur sélectionne un fichier
previewImage.classList = "preview-image";
previewImage.style.width ="420px";
previewImage.style.height ="169px";
previewImage.style.objectFit = "cover";
previewImage.style.position ="relative";
previewImage.style.bottom = "100px";
form.appendChild(previewImage);
imageInput.addEventListener("change", function () {
  const selectedFile = imageInput.files[0]; // Récupérer le fichier sélectionné

  if (selectedFile) {
    // Créer un objet FileReader pour lire le contenu de l'image sélectionnée
    const reader = new FileReader();

    // Définir le gestionnaire d'événements onload pour l'objet FileReader
    reader.onload = function (event) {
      // Mettre à jour l'aperçu de l'image avec le contenu lu
      previewImage.src = event.target.result;
    };

    // Lire le contenu de l'image en tant que données URL (base64)
    reader.readAsDataURL(selectedFile);
  } else {
    // Si aucun fichier n'est sélectionné, effacer l'aperçu de l'image
    previewImage.src = "";
  }
});

  // Gestionnaire d'événements pour l'élément input de type "file"
  imageInput.addEventListener("change", function () {
    const selectedFile = imageInput.files[0]; // Récupérer le fichier sélectionné

    if (selectedFile && selectedFile.size > 4 * 1024 * 1024) {
      // Vérifier la taille du fichier (4 Mo)
      // Afficher un message d'erreur à l'utilisateur
      alert("La taille du fichier ne doit pas dépasser 4 Mo.");

      // Réinitialiser l'élément input pour permettre à l'utilisateur de sélectionner un autre fichier
      imageInput.value = "";
    }
  });

  let titleLabel = document.createElement("label");
  titleLabel.innerHTML = "Titre";
  titleLabel.classList = "titleLabel";
  form.appendChild(titleLabel);

  const titleInput = document.createElement("input");
  titleInput.id = "titleInput";
  titleInput.type = "text";
  titleInput.ariaLabel = "Titre";
  titleInput.classList = "Input";
  titleInput.classList ="Input", "black-text";
  form.appendChild(titleInput);

  const categoryLabel = document.createElement("label");
  categoryLabel.innerHTML = "Catégorie";
  categoryLabel.classList = "titleLabel";
  form.appendChild(categoryLabel);

  const categorySelect = document.createElement("select");
  categorySelect.id = "categorySelect";
  categorySelect.classList = "categorySelect";

  // Récupérer les catégories depuis l'API
  fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categories) => {
      // Générer les options du menu déroulant
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error(
        "Erreur lors de la récupération des catégories depuis l'API :",
        error
      );
    });

  form.appendChild(categorySelect);

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Valider";
  submitButton.classList = "submit-button";
  form.appendChild(submitButton);
  submitButton.addEventListener("click", formValidate);

  

}



let addPicture = document.querySelector(".add-picture");

// Événement clic sur l'input "Ajouter une photo"
addPicture.addEventListener("click", openForm);

// Déclaration de la variable pour stocker l'ID
let currentId = 1;

function formValidate() {
  // Récupérer les valeurs du formulaire
  const title = titleInput.value;
  const category = categorySelect.value;
  const image = imageInput.files[0];

  // Vérifier si les conditions sont remplies
  if (title && category && image) {
    // Créer un objet FormData pour envoyer les données du formulaire
    const formData = new FormData();
    formData.append("id", currentId); // Ajouter l'ID
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", category); // Correction : "categorie" -> "category"

    // Envoyer les données via fetch
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${window.sessionStorage.token}`,
      },
      body: formData,
    })
      .then(function (response) {
        if (window.sessionStorage.token && response.status === 201) {
          // Le travail a été ajouté avec succès, actualiser la page pour afficher le nouveau travail
          console.log("ok pour validation");
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
    console.error(
      "Veuillez remplir tous les champs avant de soumettre le formulaire."
    );
  }
}

// Evenement au clic de supprimer la galerie
const btnDeleteGallery = document.querySelector(".delete-gallery");
btnDeleteGallery.addEventListener("click", deleteGallery);

function deleteGallery() {
  console.log("delete Gallery");
}
