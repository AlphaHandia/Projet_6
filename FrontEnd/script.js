const gallery = document.querySelector(".gallery");
const filterContainer = document.querySelector(".filterContainer");
let allProjects = []; // Variable pour stocker tous les projets

// Fonction pour afficher les filtres
function displayFilters(categories) {
  // Création du bouton "Tout" pour afficher tous les projets
  const allButton = document.createElement("button");
  allButton.textContent = "Tout";
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
    console.error("Erreur lors de la récupération des travaux :", error);
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
