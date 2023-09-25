// Exécute le code lorsque le document est complètement chargé
$(document).ready(function () {
  // Initialise la galerie d'images avec des options spécifiques
  $(".gallery").mauGallery({
    columns: {
      xs: 1, // 1 colonne pour les écrans extra-petits
      sm: 2, // 2 colonnes pour les écrans petits
      md: 3, // 3 colonnes pour les écrans moyens
      lg: 3, // 3 colonnes pour les grands écrans
      xl: 3, // 3 colonnes pour les écrans extra-larges
    },
    lightBox: true, // Active la lightbox
    lightboxId: "myAwesomeLightbox", // ID de la lightbox
    showTags: true, // Affiche les tags
    tagsPosition: "top", // Position des tags en haut
  });
});
