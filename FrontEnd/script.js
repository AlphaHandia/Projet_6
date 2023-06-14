
document.addEventListener('DOMContentLoaded', function() {
  const gallery = document.querySelector('.gallery');

  fetch('http://localhost:5678/api/works/')
    .then(response => response.json())
    .then(data => {
      
      gallery.innerHTML = '';

      // Ajoute les nouveaux travaux à la galerie
      data.forEach(travail => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const figcaption = document.createElement('figcaption');

        img.src = travail.imageUrl;
        img.alt = travail.titre;
        figcaption.textContent = travail.titre;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
      });
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des travaux :', error);
    });
});






   