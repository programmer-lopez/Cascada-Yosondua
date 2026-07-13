/*------------------------
INICIAMOS WOW
-------------------------*/
new WOW().init();

/*----------------------------------
Iniciamos smoothScroll (Scroll Suave)
--------------------------------*/
smoothScroll.init({
    speed: 1000, // Integer. How fast to complete the scroll in milliseconds
    offset: 100, // Integer. How far to offset the scrolling anchor location in pixels

});

/*---------------------------------
    OCULTAR Y MOSTRAR BOTON IR ARRIBA
 ----------------------------------*/
$(function () {
    $(window).scroll(function () {
        var scrolltop = $(this).scrollTop();
        if (scrolltop >= 50) {
            $(".ir-arriba").fadeIn();
        } else {
            $(".ir-arriba").fadeOut();
        }
    });

});

/*---------------------------------
   CABECERA ANIMADA
 ----------------------------------*/
$(window).scroll(function () {

    var nav = $('.encabezado');
    var scroll = $(window).scrollTop();

    if (scroll >= 80) {
        nav.addClass("fondo-menu");
    } else {
        nav.removeClass("fondo-menu");
    }
});

/*---------------------------------
   INTERACCIÓN DEL BUSCADOR
 ----------------------------------*/
$(function() {
    $('#bloque-buscar').on('submit', function(e) {
        e.preventDefault();
        var query = $(this).find('input[type="text"]').val();
        if (query.trim() !== '') {
            alert('Realizando búsqueda de: ' + query + '\n\n(Funcionalidad demostrativa)');
            $(this).collapse('hide');
            $(this).find('input[type="text"]').val('');
        } else {
            alert('Por favor ingresa un término para buscar.');
        }
    });
});
