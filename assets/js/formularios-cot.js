(function ($) {
    $(document).ready(function () {
        
        // --- 1. CONFIGURACIÓN INICIAL ---
        // Ocultamos todos los campos que dependen de una acción
        const camposOcultos = ".hijos_num, .campo-edad, .campo-edad-pareja, .edad-varios, .edad-solo, .sueldo, .monotributo, .possui-plano, .possui-cnpj";
        $(camposOcultos).hide();

        // Función de Scroll Genérica para no repetir código
        function scrollAlCampo($elemento) {
            if ($elemento.length) {
                $('html, body').stop().animate({
                    scrollTop: $elemento.offset().top - ($(window).height() / 2)
                }, 800);
            }
        }

        // --- 2. SELECCIÓN DE MARCAS (Bandeiras) ---
        $(".bandeiras img").click(function () {
            const $form = $(this).closest('form');
            const srcImagem = $(this).attr("src");
            const idOperadora = $(this).attr("data-id-operadora");
            const claseCss = $(this).data("data-classe-operadora");

            $form.find('.recebe-img img').remove();
            $form.find('.recebe-img').append(`<img src="${srcImagem}">`).attr('id', claseCss);
            $form.find(".campo-operadora").val(idOperadora);
            $form.find(".plano-selecionado").fadeIn();
        });

        // --- 3. LÓGICA DE TIPO DE PLANO (Refactorizada) ---
        $('.btn-vos, .btn-pareja, .btn-vosehijo, .btn-parejaehijo').click(function () {
            const $form = $(this).closest('form');
            
            // UI: Activar botón
            $form.find(".tipo-de-plano b").removeClass('ativa');
            $(this).addClass('ativa');
            $form.find(".tipo-de-plano p").addClass('ok');
            $form.find("#idCapitas-error").fadeOut();

            // Lógica por tipo
            if ($(this).hasClass('btn-vos')) {
                $form.find('input:radio[name=idCapitas]')[0].checked = true;
                $form.find(".hijos_num, .edad-varios, .campo-edad-pareja").fadeOut();
                $form.find(".campo-edad, .edad-solo").fadeIn();
            } 
            else if ($(this).hasClass('btn-pareja')) {
                $form.find('input:radio[name=idCapitas]')[1].checked = true;
                $form.find(".hijos_num, .edad-solo").fadeOut();
                $form.find(".edad-varios, .campo-edad-pareja, .campo-edad").fadeIn();
            } 
            else {
                // Familiar (Vos + hijo o Pareja + hijo)
                const esConPareja = $(this).hasClass('btn-parejaehijo');
                $form.find('input:radio[name=idCapitas]')[esConPareja ? 3 : 2].checked = true;
                $form.find(".edad-solo").fadeOut();
                $form.find(".hijos_num, .edad-varios, .campo-edad").fadeIn();
                $form.find(".campo-edad-pareja")[esConPareja ? 'fadeIn' : 'fadeOut']();
            }

            scrollAlCampo($form.find(".campo-edad"));
        });

        // --- 4. FLUJO DE OBRA SOCIAL ---
        $('.btn-con-os').click(function () {
            const $form = $(this).closest('form');
            $form.find(".possui-plano b").removeClass('ativa');
            $(this).addClass('ativa');
            $form.find('input:radio[name=poseeOS]')[0].checked = true;
            $form.find(".sueldo").fadeIn();
            scrollAlCampo($form.find(".sueldo"));
        });

        $('.btn-sin-os').click(function () {
            const $form = $(this).closest('form');
            $form.find(".possui-plano b").removeClass('ativa');
            $(this).addClass('ativa');
            $form.find('input:radio[name=poseeOS]')[1].checked = true;
            $form.find(".sueldo, .monotributo, .possui-cnpj").fadeOut();
            scrollAlCampo($form.find(".campo-nome"));
        });

        // --- 5. MÁSCARAS (Clases para soportar múltiples formularios) ---
        // Nota: Cambia los ID de tus inputs por estas clases en el HTML
        $(".mask-edad").mask("00");
        $(".mask-hijos").mask("9");
        $(".mask-phone").mask("9000000000");

        // Soporte para IDs antiguos (si no quieres cambiar el HTML aún)
        $("#edad_1, #edad_2").mask("00");
        $("#hijos_num").mask("9");
        $("#telefone").mask("9000000000");

    });
})(window.jQuery);


jQuery(document).ready(function($) {
    
    // Al principio, si el usuario escribe en el email, ya habilitamos el envío
    $('#btn-flujo').click(function() {
        var $form = $(this).closest('form');
        var $datosContacto = $form.find('#datos-contacto');

        // SI EL CONTACTO ESTÁ OCULTO: Lo mostramos
        if ($datosContacto.is(':hidden')) {
            
            // 1. Validar que al menos haya puesto la edad (opcional)
            if ($('#edad_1').val() === "") {
                alert("Por favor, indicanos tu edad antes de continuar.");
                $('#edad_1').focus();
                return;
            }

            // 2. Mostrar campos de contacto con efecto
            $datosContacto.slideDown(500);
            
            // 3. Transformar el botón para el paso final
            $(this).val('¡SOLICITAR PRECIOS AHORA!');
            $(this).attr('type', 'submit'); // Ahora sí es un submit
            
            // 4. Scroll suave al nombre para que sepa dónde seguir
            $('html, body').animate({
                scrollTop: $datosContacto.offset().top - 100
            }, 800);

        }
    });

    // Si el usuario vuelve a cambiar el tipo de plan, podrías resetear el botón
    $('.btn-vos, .btn-pareja, .btn-vosehijo, .btn-parejaehijo').click(function() {
        // Cada vez que eligen quién ingresa, nos aseguramos que las edades se vean
        $('.edades').fadeIn();
    });
});