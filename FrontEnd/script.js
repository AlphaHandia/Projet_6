const gallery = document.querySelector(".gallery");
const filterContainer = document.querySelector(".filterContainer");
let allProjects = []; // Variable pour stocker tous les projets

// Fonction pour masquer le contenu de filterContainer
function hideFilters() {
  const filterContainer = document.querySelector(".filterContainer");
  filterContainer.style.display = "none";
}

// Vérifier si l'authentification a réussi en regardant les paramètres d'URL
function checkAuthentication() {
  const urlParams = new URLSearchParams(window.location.search);
  const authenticated = urlParams.get("authenticated");
  const hiddenBanner = document.querySelector(".bannerBlack");
  const hiddenbtnFirstPicture = document.querySelector(".btnOpenFirstPicture");
  const hiddenbtnModal = document.querySelector(".btnOpenModal");
  const logout = document.querySelector(".login-css");
  if (authenticated === "true") {
    hideFilters(); // Masquer le contenu de filterContainer si l'authentification a réussi
    hiddenBanner.style.display = "flex";
    hiddenbtnFirstPicture.style.display = "flex";
    hiddenbtnModal.style.display = "flex";
logout.innerHTML="logout";
  }
}
// Appeler la fonction pour vérifier l'authentification lorsque la page est chargée
document.addEventListener("DOMContentLoaded", checkAuthentication);
// Fonction pour afficher les filtres
function displayFilters(categories) {
  // Création du bouton "Tout" pour afficher tous les projets
  const allButton = document.createElement("button");
  allButton.textContent = "Tous";
  allButton.classList.add("filterContainer-selected"); // Ajout de la classe CSS par défaut
  allButton.addEventListener("click", function () {
    displayProjects(allProjects); // Affichage de tous les projets
    //mise à jour de la classe CSS des boutons
    updateButtonClass(allButton);
  });
  filterContainer.appendChild(allButton);

  categories.forEach((category) => {
    const filter = document.createElement("div");
    const button = document.createElement("button");
    button.textContent = category.name;

    button.addEventListener("click", function () {
      // Filtrer les projets en fonction de la catégorie
      const filteredProjects = allProjects.filter(
        (project) => project.categoryId === category.id
      );
      displayProjects(filteredProjects);

      updateButtonClass(button);
    });

    filterContainer.appendChild(filter);
    filterContainer.appendChild(button);
  });
}

// Fonction pour afficher les projets
function displayProjects(projects) {
  gallery.innerHTML = "";

  projects.forEach((project) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = project.imageUrl;
    img.alt = project.title;
    figcaption.textContent = project.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}

// Fonction pour mettre à jour la classe CSS des boutons
function updateButtonClass(selectedButton) {
  const buttons = filterContainer.querySelectorAll("button");
  buttons.forEach((button) => {
    if (button === selectedButton) {
      button.classList.add("filterContainer-selected");
    } else {
      button.classList.remove("filterContainer-selected");
    }
  });
}

// Récupérer les catégories depuis l'API
fetch("http://localhost:5678/api/categories/")
  .then((response) => response.json())
  .then((categories) => {
    displayFilters(categories); // Afficher les filtres par nom de categories
  })
  .catch((error) => {
    console.error("Erreur lors de la récupération des catégories :", error);
  });

// Récupération de tous les projets depuis l'API
fetch("http://localhost:5678/api/works/")
  .then((response) => response.json())
  .then((projects) => {
    allProjects = projects; // Stockage de tous les projets
    displayProjects(projects); // Affichage de tous les projets initialement
  })
  .catch((error) => {
    alert("Erreur lors de la récupération des travaux :", error);
  });
async function getUpdatedProjects() {
  try {
    const response = await fetch("http://localhost:5678/api/works/");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des travaux");
    }
    const projects = await response.json();
    allProjects = projects;
    displayProjects(projects); // Affichage des projets mis à jour dans la galerie
  } catch (error) {
    console.error("Erreur lors de la récupération des travaux :", error);
  }
}
