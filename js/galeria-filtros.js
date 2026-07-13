document.addEventListener("DOMContentLoaded", () => {
    const contenedorFiltros = document.getElementById("contenedor-filtros-galeria");
    const contenedorGaleria = document.getElementById("contenedor-galeria-dinamica");
    const modalCarouselInner = document.querySelector("#galleryCarousel .carousel-inner");
    const modalCarouselIndicators = document.querySelector("#galleryCarousel .carousel-indicators-custom"); // For thumbnails
    
    // Configuración inicial
    const categoriaInicial = "eventos";
    let categoriaActual = categoriaInicial;

    // Función para obtener ruta base de imagen
    const obtenerRutaImagen = (categoriaInfo, nombreImagen) => {
        if (categoriaInfo.carpeta) {
            return `images/galeria/${categoriaInfo.carpeta}/${nombreImagen}`;
        }
        return `images/galeria/${nombreImagen}`;
    };

    // Renderizar botones de filtro
    const renderizarFiltros = () => {
        contenedorFiltros.innerHTML = "";
        categoriasGaleria.forEach(cat => {
            const btn = document.createElement("button");
            btn.className = `btn btn-outline-primary m-1 filter-btn ${cat.id === categoriaActual ? 'active' : ''}`;
            btn.textContent = cat.nombre;
            btn.dataset.id = cat.id;
            
            btn.addEventListener("click", () => {
                // Actualizar estado activo
                document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                
                categoriaActual = cat.id;
                renderizarGaleria(categoriaActual);
            });
            
            contenedorFiltros.appendChild(btn);
        });
    };

    // Renderizar la cuadrícula de imágenes
    const renderizarGaleria = (categoriaId) => {
        contenedorGaleria.innerHTML = "";
        const categoriaSeleccionada = categoriasGaleria.find(cat => cat.id === categoriaId);
        
        if (!categoriaSeleccionada || categoriaSeleccionada.imagenes.length === 0) {
            contenedorGaleria.innerHTML = `<p class="text-center w-100 py-3">Aún no hay imágenes en esta categoría.</p>`;
            actualizarModal([], categoriaSeleccionada);
            return;
        }

        categoriaSeleccionada.imagenes.forEach((imgName, index) => {
            const imgPath = obtenerRutaImagen(categoriaSeleccionada, imgName);
            
            const a = document.createElement("a");
            a.href = "#";
            a.className = "gallery-item wow fadeIn";
            a.dataset.toggle = "modal";
            a.dataset.target = "#galleryModal";
            a.dataset.wowDelay = `${0.1 + (index * 0.1)}s`;
            a.onclick = (e) => {
                e.preventDefault();
                $('#galleryCarousel').carousel(index);
            };
            
            const img = document.createElement("img");
            img.src = imgPath;
            img.alt = `${categoriaSeleccionada.nombre} - Foto ${index + 1}`;
            
            a.appendChild(img);
            contenedorGaleria.appendChild(a);
        });
        
        // Actualizar también el contenido del Modal para esta categoría
        actualizarModal(categoriaSeleccionada.imagenes, categoriaSeleccionada);
    };

    // Actualizar el Modal (carrusel interno)
    const actualizarModal = (imagenes, categoriaInfo) => {
        modalCarouselInner.innerHTML = "";
        if (modalCarouselIndicators) modalCarouselIndicators.innerHTML = "";
        
        if (imagenes.length === 0) return;
        
        imagenes.forEach((imgName, index) => {
            const imgPath = obtenerRutaImagen(categoriaInfo, imgName);
            
            // Item principal del carrusel
            const item = document.createElement("div");
            item.className = `carousel-item ${index === 0 ? 'active' : ''}`;
            
            const img = document.createElement("img");
            img.src = imgPath;
            img.className = "d-block w-100";
            img.alt = `Foto ${index + 1}`;
            
            item.appendChild(img);
            modalCarouselInner.appendChild(item);
            
            // Miniatura si existe el contenedor de indicadores
            if (modalCarouselIndicators) {
                const col = document.createElement("div");
                col.className = "col-2 px-1 text-center";
                
                const a = document.createElement("a");
                a.href = "#";
                a.dataset.target = "#galleryCarousel";
                a.dataset.slideTo = index;
                a.style.display = "block";
                
                const thumb = document.createElement("img");
                thumb.src = imgPath;
                thumb.className = "img-fluid";
                thumb.style.cssText = "border-radius: 4px; border: 2px solid #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.5); opacity: 0.8; height:60px; object-fit:cover; width:100%; transition: opacity 0.3s;";
                thumb.onmouseover = function() { this.style.opacity = 1; };
                thumb.onmouseout = function() { this.style.opacity = 0.8; };
                
                a.appendChild(thumb);
                col.appendChild(a);
                modalCarouselIndicators.appendChild(col);
            }
        });
    };

    // Inicializar
    renderizarFiltros();
    renderizarGaleria(categoriaInicial);
});
