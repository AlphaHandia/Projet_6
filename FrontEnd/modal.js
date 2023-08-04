// variables générales
let token = window.sessionStorage.token;
const modal = document.querySelector("#modal1");
const btnOpenModal = document.querySelector(".btnOpenModal");
const btncloseModal = document.querySelector(".close");
const modalContainer = document.querySelector(".modal-container");
let modalContent = document.querySelector(".modal-content");
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
                // Le travail a été supprimé avec succès
                console.log(token);
                console.log("ok pour destruction");
                figure.remove(); // retrait de l'élément de la modal
                location.reload("index.html?authenticated=true"); // relocalisation avec authentification réussi et enregistré pour continuer à utiliser le mode création
              } else {
                alert("Erreur lors de la suppression du travail");
              }
            })
            .catch(function (error) {
              alert("Erreur lors de la suppression du travail :", error);
            });
        });
      });
    })
    .catch((error) => {
      alert("Erreur lors de la récupération des works depuis l'API :", error);
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

async function openForm() {
  // ajustement taille modale
  modalContent.style.height = "670px";
  // declaration élément parent
  const modal0 = document.querySelector(".modal0");
  modal0.style.display = "none";

  const form = document.querySelector(".modalForm");
  form.id = "modalForm";
  form.enctype = "multipart/form-data";
  // déclaration icone flèche gauche de retour
  let iconArrow = document.createElement("i");
  iconArrow.className = "fa-solid fa-arrow-left";
  form.appendChild(iconArrow);
  iconArrow.addEventListener("click", closeForm);
  // fonction utilisé pour fermer le formulaire avec icone arrow left
  function closeForm() {
    form.innerHTML = "";
    modal0.style.display = "flex";
    modal0.classList.add("closeForm");
    modalContent.style.height = "731px";
  }
  // titre formulaire
  let formLabel = document.createElement("h2");
  formLabel.innerHTML = "Ajout photo";
  formLabel.classList = "formLabel";
  form.appendChild(formLabel);
  // icone image formulaire avant insertion de type file
  let iconImage = document.createElement("i");
  iconImage.className = "fa-regular fa-image fa-2xl";
  form.appendChild(iconImage);
  // background de l'input type file
  let backgroundLabel = document.createElement("label");
  backgroundLabel.innerText = "";
  backgroundLabel.classList = "backgroundLabel";
  form.appendChild(backgroundLabel);
  // ajout titre pour l'input type file
  let imageLabel = document.createElement("label");
  imageLabel.innerText = " + Ajouter  photo";
  imageLabel.classList = "imageLabel";
  form.appendChild(imageLabel);
  // ajout du soutitre avec types de documents utorisé et taille
  let subtitleImageLabel = document.createElement("p");
  subtitleImageLabel.innerText = "jpg,png : 4mo max";
  subtitleImageLabel.classList = "subtitleImageLabel";
  form.appendChild(subtitleImageLabel);
  // input de l'image
  let imageInput = document.createElement("input");
  imageInput.required = true;
  imageInput.id = "imageInput";
  imageInput.type = "file";
  imageInput.accept = "image/jpeg, image/png"; // Définition des types de fichiers acceptés
  imageInput.classList = "imageInput";
  form.appendChild(imageInput);
  // affichage en miniature de l'image inséré
  const previewImage = document.createElement("img");
  previewImage.id = "previewImage";
  previewImage.src = ""; // L'image source sera définie lorsque l'utilisateur sélectionne un fichier
  previewImage.classList = "preview-image";
  form.appendChild(previewImage);
  // gestionnaire de l'évènement d'ajout d'une image dans l'input de type file
  imageInput.addEventListener("change", function () {
    const selectedFile = imageInput.files[0]; // Récupération du fichier sélectionné

    if (selectedFile) {
      // Création un objet FileReader pour lire le contenu de l'image sélectionnée
      const reader = new FileReader();

      // Définition du gestionnaire d'événements onload pour l'objet FileReader
      reader.onload = function (event) {
        // Mise a jour l'aperçu de l'image avec le contenu lu
        previewImage.src = event.target.result;
      };

      // Lecture du contenu de l'image en tant que données URL (base64)
      reader.readAsDataURL(selectedFile);
      previewImage.style.visibility = "visible";
    } else {
      // Si aucun fichier n'est sélectionné, effacemnt l'aperçu de l'image
      previewImage.src = "";
    }
  });

  // Gestionnaire d'événements pour l'élément input de type "file"
  imageInput.addEventListener("change", function () {
    const selectedFile = imageInput.files[0]; // Récupération d fichier sélectionné

    if (selectedFile && selectedFile.size > 4 * 1024 * 1024) {
      // Vérification  la taille du fichier (4 Mo)
      // Affichage un message d'erreur à l'utilisateur
      alert("La taille du fichier ne doit pas dépasser 4 Mo.");

      // Réinitialisation de l'élément input pour permettre à l'utilisateur de sélectionner un autre fichier
      imageInput.value = "";
    }
  });
  // ajout du titre de l'input titre
  let titleLabel = document.createElement("label");
  titleLabel.innerHTML = "Titre";
  titleLabel.classList = "titleLabel";
  form.appendChild(titleLabel);
  // ajout de l'input pour le titre de l'image
  const titleInput = document.createElement("input");
  titleInput.id = "titleInput";
  titleInput.type = "text";
  titleInput.ariaLabel = "Titre";
  titleInput.classList = "Input";
  titleInput.required = true;
  (titleInput.classList = "Input"), "black-text";
  form.appendChild(titleInput);
  // ajout du titre de l'input de selection de categorie de l'image
  const categoryLabel = document.createElement("label");
  categoryLabel.innerHTML = "Catégorie";
  categoryLabel.classList = "titleLabelCategory";
  form.appendChild(categoryLabel);
  // ajout de l'input des categories
  const categorySelect = document.createElement("select");
  categorySelect.id = "categorySelect";
  categorySelect.classList = "categorySelect";
  categorySelect.required = true;

  // Récupération les catégories depuis l'API
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
      alert(
        "Erreur lors de la récupération des catégories depuis l'API :",
        error
      );
    });

  form.appendChild(categorySelect);
  // ajout de la ligne inférieur de délimitation de champs des formulaire
  const lineform = document.createElement("p");
  lineform.classList = "lineform";
  form.appendChild(lineform);
  // ajout du bouton de type submit au formulaire d'ajout de photo
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Valider";
  submitButton.classList = "submit-button";
  form.appendChild(submitButton);
  // Vérification si les champs sont remplis pour désactiver le bouton de soumission
  function handleInputChanges() {
    // Récupération des éléments nécessaires
    const isImageAcquired = imageInput.files && imageInput.files.length > 0;
    const isTitleAcquired = titleInput.value.trim() !== "";
    const isCategoryAcquired = categorySelect.value !== "";
    // Vérification si les champs sont remplis
    if (isImageAcquired && isTitleAcquired && isCategoryAcquired) {
      submitButton.classList.add("disabled");
      submitButton.style.cursor = "pointer";
    } else {
      submitButton.classList.remove("disabled");
    }
  }

  // Événements de saisie pour vérifier si les champs sont remplis
  imageInput.addEventListener("change", handleInputChanges);
  titleInput.addEventListener("input", handleInputChanges);
  categorySelect.addEventListener("change", handleInputChanges);
  // gestionnaire de l'évènement submit au clic du bouton du formulaire d'ajout photo
  submitButton.addEventListener("click", formValidate);
}

// Événement clic sur l'input "Ajouter une photo"
let addPicture = document.querySelector(".add-picture");
addPicture.addEventListener("click", openForm);

// Déclaration de la variable pour stocker l'ID
let currentId = 1;

function formValidate() {
  // Récupérer les valeurs du formulaire
  const title = titleInput.value;
  const category = categorySelect.value;
  const image = imageInput.files[0];

  // Vérification si les conditions sont remplies
  if (title && category && image) {
    // Création d'un objet FormData pour envoyer les données du formulaire
    const formData = new FormData();
    formData.append("id", currentId); // Ajout ID
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", category);

    // Envoyer les données via fetch
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${window.sessionStorage.token}`
        
      },
      body: formData
    })
      .then(function (response) {
        if (window.sessionStorage.token && response.ok) {
          // Le travail a été ajouté avec succès
          console.log("ok pour validation");
          
          location.reload("index.html?authenticated=true") // relocalisation avec authentification réussi et enregistré pour continuer à utiliser le mode création
        } else {
          // Gestion des érreurs
          alert(
            "Erreur, veuillez vérifier que toutes les informations fournies dans le formulaire sont complètes et correctes avant de soumettre."
          );
        }
      })
      .catch(function (error) {
        console.log("Erreur lors de l'ajout du travail :", error);
      });

    // Incrémenter l'ID pour le prochain élément
    currentId++;
  } else {
    // Affichichage d'un message d'erreur si les conditions ne sont pas remplies
    console.error(
      "Veuillez remplir tous les champs avant de soumettre le formulaire."
    );
  }
}

// Evenement au clic de supprimer la galerie
const btnDeleteGallery = document.querySelector(".delete-gallery");
btnDeleteGallery.addEventListener("click", deleteGallery);
// déclaration de la fonction de suppression de la totalité de la gallerie (non fonctionnel)
function deleteGallery() {
  console.log("delete Gallery");
}
