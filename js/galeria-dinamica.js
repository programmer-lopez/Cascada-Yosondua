// Script para generar la galería y el carrusel de inicio dinámicamente

// Script para generar la galería y el carrusel de inicio dinámicamente

(function() {
    // 1. Aplanar el arreglo de carpetas en una sola lista de imágenes
    const todasLasImagenes = [];
    if (typeof galeriaDatos !== 'undefined') {
        galeriaDatos.forEach(cat => {
            const imagenes = Array.isArray(cat.imagenes) ? cat.imagenes : [cat.imagenes];
            imagenes.forEach(img => {
                todasLasImagenes.push({
                    carpeta: cat.carpeta,
                    titulo: cat.titulo, // El título es el nombre de la carpeta en mayúsculas
                    imagen: img,
                    src: `images/inicio/carousel/${cat.carpeta}/${img}`
                });
            });
        });
    }

    // 2. Mezclar aleatoriamente las imágenes
    todasLasImagenes.sort(() => 0.5 - Math.random());

    // 3. Tomar todas las imágenes (sin límite)
    const imagenesMostrar = todasLasImagenes;

    // 4. Generar el HTML
    let carouselHtml = '';
    let modalInnerHtml = '';
    let thumbnailsHtml = '';

    imagenesMostrar.forEach((item, index) => {
        // Tarjetas del carrusel principal
        carouselHtml += `
            <a href="#" class="carousel-card" data-toggle="modal" data-target="#inicioGalleryModal" onclick="$('#inicioGalleryCarousel').carousel(${index}); return false;">
                <img src="${item.src}" alt="${item.titulo}">
                <div class="carousel-card-overlay">
                    <h4 style="color: white !important; text-shadow: 1px 1px 4px rgba(0,0,0,0.9);">${item.titulo}</h4>
                    <span>Explora esta foto</span>
                </div>
            </a>
        `;

        // Elementos grandes del Modal
        modalInnerHtml += `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${item.src}" class="d-block w-100" style="max-height: 70vh; object-fit: contain;" alt="${item.titulo}">
            </div>
        `;

        // Miniaturas en la parte inferior del Modal
        thumbnailsHtml += `
            <div class="col-2 px-1 text-center mb-2">
                <a href="#" data-target="#inicioGalleryCarousel" data-slide-to="${index}" style="display:block;">
                    <img src="${item.src}" class="img-fluid"
                        style="border-radius: 4px; border: 2px solid #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.5); opacity: 0.8; height:60px; object-fit:cover; width:100%; transition: opacity 0.3s;"
                        onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.8">
                </a>
            </div>
        `;
    });

    // 5. Inyectar el HTML en la página si existen los contenedores
    // Nota: Owl Carousel necesita ser inicializado DESPUÉS de agregar los elementos
    const mainCarouselContainer = document.querySelector('.owl-carousel');
    if (mainCarouselContainer) {
        // Si OwlCarousel ya estaba inicializado, esto podría requerir destruirlo primero
        // Pero como lo llamamos en DOMContentLoaded, tal vez ya se inicializó.
        // Lo mejor es inyectar antes de inicializar o destruir/reinicializar.
        mainCarouselContainer.innerHTML = carouselHtml;
    }

    const modalInnerContainer = document.querySelector('#inicioGalleryCarousel .carousel-inner');
    if (modalInnerContainer) {
        modalInnerContainer.innerHTML = modalInnerHtml;
    }

    const thumbnailsContainer = document.querySelector('#inicioGalleryThumbnails');
    if (thumbnailsContainer) {
        thumbnailsContainer.innerHTML = thumbnailsHtml;
    }
})();
