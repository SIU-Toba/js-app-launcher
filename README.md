# js-app-launcher
Librería JS para graficar un lanzador de aplicaciones. La misma requiere jQuery para su funcionamiento.

### Inicialización

Para inicializar la librería se deben configurar los siguientes parametros:

* container_appLauncher: Nombre de la clase del tag html que contendrá el app-launcher, para el siguiente ejemplo el valor de container_appLauncher es `contenedor`:

  ```<div class="contenedor"> </div>```
  
* appLauncherDataJSON: JSON que contiene información del usuario y aplicaciones a las que tiene acceso. Solo se muestran los datos que estan definidos en el mismo. El formato JSON es el sigueinte:

```
  {
        ‘usuario_id’ : ‘admin’,
        ‘usuario_nombre’ : ‘Usuario Administrador’,
        ‘usuario_foto’:    ‘http://aplicacion.com/perfil/admin.png’
        ‘perfil_url’: ‘http://aplicacion.com/perfil/’
        ‘aplicaciones’ :
        [
            {
              ‘url’ : ‘http://aplicacion1.com’,
              ‘icono_url’ : ‘http://aplicacion1.com/logo.png’,
              ‘etiqueta’ : ‘Aplicacion 1’,
              ‘title’: ‘descripcion de aplicacion 1‘
            },
            {
              ‘url’ : ‘http://aplicacion2.com’,
              ‘icono_url’ : ‘http://aplicacion2.com/logo.png’,
              ‘etiqueta’ : ‘Aplicacion 2’,
              ‘title’: ‘descripcion de aplicacion 2‘
            },
            {
            ...
            }
        ]
}
```
 
* js_salir: Lógica javaScript que se aplica al boton de `salir`.


### Modo de uso

Para utilizar la librería debemos tener en cuenta lo siguiente:

* Incluir archivo CSS, en la carpeta `css` se incluye un por defecto:

  ```
  <link rel="stylesheet" href="css/app_launcher.css" type="text/css" />
  ```

* Incluir la librería propiamente dicha:

  ```
  <script type="text/javascript" src="app_launcher.js"></script>  
  ```

* Definir un tag html que contendrá el app-launcher, por ejemplo un `<div>`:

  ```
  <div class="enc-usuario" >   
  </div>
  ```

* Inicializar el app-launcher mediante código javaScript:

  ```
  <script>
    appLauncher.init('.enc-usuario', '{"usuario_id":"admin","usuario_nombre":"Usuario Administrador","usuario_foto":"img\/foto_perfil_defecto.png","perfil_url":"#","aplicaciones":[]}', 'alert("Salir de la aplicación!!!");');
  </script>
  ```
  


