// Encapsulation du plugin dans une fonction anonyme pour éviter les conflits de noms
(function ($) {
  // Définition du plugin mauGallery
  $.fn.mauGallery = function (options) {
    // Fusion des options par défaut avec celles fournies par l'utilisateur
    var options = $.extend($.fn.mauGallery.defaults, options);
    var tagsCollection = [];

    // Pour chaque élément sur lequel le plugin est appelé
    return this.each(function () {
      $.fn.mauGallery.methods.createRowWrapper($(this));

      // Si l'option lightBox est activée, créez la lightbox
      if (options.lightBox) {
        $.fn.mauGallery.methods.createLightBox(
          $(this),
          options.lightboxId,
          options.navigation
        );
      }

      // Attachez les écouteurs d'événements
      $.fn.mauGallery.listeners(options);

      // Pour chaque élément .gallery-item
      $(this)
        .children(".gallery-item")
        .each(function (index) {
          $.fn.mauGallery.methods.responsiveImageItem($(this));
          $.fn.mauGallery.methods.moveItemInRowWrapper($(this));
          $.fn.mauGallery.methods.wrapItemInColumn($(this), options.columns);

          var theTag = $(this).data("gallery-tag");
          if (
            options.showTags &&
            theTag !== undefined &&
            tagsCollection.indexOf(theTag) === -1
          ) {
            tagsCollection.push(theTag);
          }
        });

      if (options.showTags) {
        $.fn.mauGallery.methods.showItemTags(
          $(this),
          options.tagsPosition,
          tagsCollection
        );
      }

      $(this).fadeIn(500);
    });
  };

  // Options par défaut du plugin
  $.fn.mauGallery.defaults = {
    columns: 3,
    lightBox: true,
    lightboxId: null,
    showTags: true,
    tagsPosition: "bottom",
    navigation: true,
  };

  // Écouteurs d'événements pour le plugin
  $.fn.mauGallery.listeners = function (options) {
    $(".gallery-item").on("click", function () {
      if (options.lightBox && $(this).prop("tagName") === "IMG") {
        $.fn.mauGallery.methods.openLightBox($(this), options.lightboxId);
      } else {
        return;
      }
    });

    $(".gallery").on("click", ".nav-link", $.fn.mauGallery.methods.filterByTag);
    $(".gallery").on("click", ".mg-prev", () =>
      $.fn.mauGallery.methods.prevImage(options.lightboxId)
    );
    $(".gallery").on("click", ".mg-next", () =>
      $.fn.mauGallery.methods.nextImage(options.lightboxId)
    );
  };

  // Méthodes utilisées par le plugin
  $.fn.mauGallery.methods = {
    // Crée un conteneur pour les éléments de la galerie
    createRowWrapper(element) {
      if (!element.children().first().hasClass("row")) {
        element.append('<div class="gallery-items-row row"></div>');
      }
    },
    // Enveloppe chaque élément de la galerie dans une colonne
    wrapItemInColumn(element, columns) {
      // ... (code pour envelopper l'élément dans une colonne en fonction de la taille de l'écran)
    },
    // Déplace l'élément dans le conteneur de la galerie
    moveItemInRowWrapper(element) {
      element.appendTo(".gallery-items-row");
    },
    // Rend l'élément de la galerie réactif
    responsiveImageItem(element) {
      if (element.prop("tagName") === "IMG") {
        element.addClass("img-fluid");
      }
    },
    // Ouvre la lightbox avec l'image cliquée
    openLightBox(element, lightboxId) {
      $(`#${lightboxId}`)
        .find(".lightboxImage")
        .attr("src", element.attr("src"));
      $(`#${lightboxId}`).modal("toggle");
    },
    // Affiche l'image précédente dans la lightbox
    prevImage() {
      // ... (code pour naviguer vers l'image précédente)
    },
    // Affiche l'image suivante dans la lightbox
    nextImage() {
      // ... (code pour naviguer vers l'image suivante)
    },
    // Crée la lightbox
    createLightBox(gallery, lightboxId, navigation) {
      // ... (code pour créer la structure HTML de la lightbox)
    },
    // Affiche les tags pour filtrer les éléments de la galerie
    showItemTags(gallery, position, tags) {
      // ... (code pour afficher les tags)
    },
    // Filtre les éléments de la galerie en fonction du tag sélectionné
    filterByTag() {
      // ... (code pour filtrer les éléments)
    },
  };
})(jQuery);
