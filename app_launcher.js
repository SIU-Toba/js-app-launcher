// Class appLauncher
var appLauncher = new function () {

    var scroll = false;
    var launcherMaxLineHeight = 100;
    
    // Metodo que inicializa el lanzador de aplicaciones
    this.init = function (container_appLauncher, appLauncherDataJSON, js_salir) {
        
        // convertir el json string a array
        var appLauncherData = jQuery.parseJSON(appLauncherDataJSON);
        // determino la cantidad de aplicaciones
        var cant_apps = appLauncherData.aplicaciones.length;
        // determino la cantidad de lineas
        var cant_lineas = Math.ceil(cant_apps / 3);
        
        var height_first_set = 0;
        var height_apps = 0;
        
        // Armo el HTML
        
        // Armo el HTML del perfil de usuario
        $(container_appLauncher).append("<div class='container_datos_usuario'> </div>");
        $(".container_datos_usuario").html("<div class='datos_usuario_general'> </div>");
        $(".datos_usuario_general").html("<div class='button_datos_usuario'> </div>");
        $(".datos_usuario_general").append("<div class='datos_usuario'> </div>");
        $(".datos_usuario").html("<div class='perfil_usuario'> </div>");
        $(".perfil_usuario").html("<div class='perfil_usuario_foto'> </div>");
        
        if (appLauncherData.usuario_foto != undefined) {
            $(".button_datos_usuario").append("<div class='button_datos_usuario_foto'> <img class='perfil_usuario_boton_foto_img' src='" + appLauncherData.usuario_foto + "'></i> </div>");
            $(".perfil_usuario_foto").html("<img class='perfil_usuario_foto_img' src='" + appLauncherData.usuario_foto + "'></i> ");
        }
        $(".button_datos_usuario").append("<div class='perfil_usuario_boton_cuenta_id'>" + appLauncherData.usuario_id + "</div>");
        
        $(".perfil_usuario").append("<div class='perfil_usuario_cuenta'> </div>");
        $(".perfil_usuario_cuenta").html("<div class='perfil_usuario_cuenta_nombre'> </div>");
        
        if (appLauncherData.usuario_nombre != undefined) {
            $(".perfil_usuario_cuenta_nombre").html(appLauncherData.usuario_nombre);
        }
        
        $(".perfil_usuario_cuenta").append("<div class='perfil_usuario_cuenta_id'> </div>");
        if (appLauncherData.usuario_id != undefined) {
            $(".perfil_usuario_cuenta_id").html(appLauncherData.usuario_id);
        }
        
        $(".perfil_usuario_cuenta").append("<div class='perfil_usuario_cuenta_botones'> </div>");
        
        $(".perfil_usuario_cuenta_botones").append("<div class='perfil_usuario_cuenta_perfil'> </div>");
        if (appLauncherData.perfil_url != undefined) {
            $(".perfil_usuario_cuenta_perfil").html("<a class='boton_cuenta' href='"+ appLauncherData.perfil_url + "' target='perfil_usuario_" + appLauncherData.usuario_id + "'> Mi cuenta  </a>" );
        }
        
        $(".perfil_usuario_cuenta_botones").append("<div class='perfil_usuario_cuenta_salir'> </div>");
        if (js_salir != undefined) {
            $(".perfil_usuario_cuenta_salir").html("<a class='boton_salir' href='#' onclick = '" + js_salir + "'> Salir </a>" );
        }
        
        // Armo la logica del boton de perfil del usuario
        this.setearLogicaBoton('.datos_usuario', '.button_datos_usuario', ['.app-launcher']);
         
        // Armo el HTML con las aplicaciones
        if (cant_apps > 0) {
            $(container_appLauncher).append("<div class='container_aplicaciones'> </div>");
            $(".container_aplicaciones").html("<div class='launcher'> </div>");
            $(".launcher").html("<div class='button'><i class='fa fa-th fa-2x'></i></div>");
            $(".launcher").append("<div class='app-launcher'> </div>");
            $(".app-launcher").html("<div class='app-launcher-container'> </div>");
            $(".app-launcher-container").append("<div class='apps'> </div>");
        
            $(".apps").html("<ul class='first-set'> </ul>");

            if (cant_lineas <=3) {
                height_first_set = cant_lineas * launcherMaxLineHeight;
                height_apps = height_first_set + 57;
            } else {
                height_first_set = 3 * launcherMaxLineHeight;
                height_apps = height_first_set + 97;

                $(".apps").append("<a href='#' class='more'>Más</a>");
                $(".apps").append("<ul class='second-set hide'> </div>");
            }

            // Recorro las aplicaciones y generon los links
            $(appLauncherData.aplicaciones).each(function( index, element ) {
                if (element.url != undefined && element.icono_url != undefined && element.etiqueta != undefined && element.title != undefined) {
                    if (index < 9) {
                        $(".first-set").append("<li><a href='"+ element.url +"' target='aplicacion_"+ index +"' id='aplicacion_"+ index +"'> <img class='fa fa-4x icono_url' src='" + element.icono_url + "' alt='" + element.title + "'></i> " + element.etiqueta + " </a> </li>");
                    } else {
                        $(".second-set").append("<li><a href='"+ element.url +"' target='aplicacion_"+ index +"' id='aplicacion_"+ index +"'> <img class='fa fa-4x icono_url' src='" + element.icono_url + "' alt='" + element.title + "'></i> " + element.etiqueta + " </a> </li>");
                    }
                }
            });

            // Setea el maximo alto del contenedor de items
            $('.first-set').css({height: height_first_set});
                
            // Setea el maximo alto del contenedor de aplicaciones
            $('.apps').css({height: height_apps});

            // Mousewheel event handler to detect whether user has scrolled over the container
            $('.apps').bind('mousewheel', function (e) {
                if (e.originalEvent.wheelDelta / 120 > 0) {
                    // Scrolling up
                }
                else {
                    // Scrolling down
                    if (!scroll) {
                        $(".second-set").show();
                        $('.apps').css({height: height_apps}).addClass('overflow');
                        scroll = true;
                        $(this).scrollTop(e.originalEvent.wheelDelta);
                    }
                }
            });

            // Scroll event to detect that scrollbar reached top of the container
            $('.apps').scroll(function () {
                var pos = $(this).scrollTop();
                if (pos == 0) {
                    scroll = false;
                    $('.apps').css({height: height_apps}).removeClass('overflow');
                    $(".second-set").hide();
                }
            });

            // Click event handler to show more apps
            $('.apps .more').click(function () {
                $(".second-set").show();
                $(".apps").animate({scrollTop: $('.apps')[0].scrollHeight}).css({height: height_apps}).addClass('overflow');
            }); 

            // Armo la logica del boton de aplicaciones
            this.setearLogicaBoton('.app-launcher', '.button', ['.datos_usuario']);
        }
        
    };
    
    this.setearLogicaBoton = function (divBoton, boton, divBotonOcultar) {
        // Prevent hiding on click inside app launcher
        $(divBoton).click(function (event) {
            event.stopPropagation();
        });

        // Click event handler to toggle dropdown
        $(boton).click(function (event) {
            event.stopPropagation();
            $(divBoton).toggle();
            $(divBotonOcultar).each(function( index ) {
                $(divBotonOcultar[index]).hide();
            });
        });

        // Oculto el div inicialmente
        $(divBoton).hide();

    };
    
    // Metodo para ocultar appLauncher cuando se clickea fuera del board
    $(document).click(function () {
        //Hide the launcher if visible
        $('.app-launcher').hide();
        $('.datos_usuario').hide();
    });

    // Resize event handler to maintain the max-height of the app launcher
    $(window).resize(function () {
        $('.apps').css({maxHeight: $(window).height() - $('.apps').offset().top});
        $('.perfil_usuario').css({maxHeight: $(window).height() - $('.perfil_usuario').offset().top});
    });
    
};
