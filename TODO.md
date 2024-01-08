# Parte común 

- [X] Los elementos de la Página principal se cargan inicialmente usando AJAX. (1 punto)
- [X] Botón Cargar más elementos en la Página Principal. (2 puntos)
  - [X] Inicialmente se muestran entre 3 y 5 elementos (como mejor quede en el diseño de la página)
  - [X] El botón Cargar más elementos, al ser pulsado, descarga del servidor con AJAX los siguientes 3 a 5 elementos
  - [X] Se pueden implementar las siguientes alternativas en vez de un botón Cargar más elementos (misma calificación):
    - [X] Scroll infinito
- [X] Validación de formulario a nivel de cliente (pista: bootstrap tiene utilidades para esto)
  - [X] El campo título no debe estar vacío. (0.25 puntos)
  - [X] El campo título debe tener como primer carácter una letra mayúscula. (0.75 puntos)
  - [X] El campo descripción no debe estar vacío. (0.25 puntos)
  - [X] El campo descripción debe contener entre 50 y 500 caracteres. (0.5 puntos)
  - [X] El campo URL de imagen debe ser una URL válida. (0.5 puntos)
  - [X] Inmediatamente al escribir datos inválidos en algún campo muestra un error. (0.75 puntos)


# Parte opcional

- [X] Cambiar la implementación de la lista de favoritos para que se ejecute en el front, evitando la recarga de la página  (+3 puntos)
- [X] Barra de búsqueda de elementos (+1 punto)
- [ ] Filtro de elementos (+1 punto)
- [X] Mostrar los elementos (grid) en una sola columna (+2 puntos)
- [X] Página nuevo elemento/editar elemento: Al introducir un título, se comprueba que no exista en el servidor sin recargar la página (+1.5 puntos)
- [X] Página detalle: Se cargan y añaden los subelementos sin recargar la página (AJAX) (+0.5 puntos)
- [ ] Animaciones con JavaScript (puntuación variable)
  - [ ] Animacion al navegar entre páginas

# Problemas que solucionar

- Carga inicial de elementos en la página principal: Poner una barra de carga mientras se cargan los elementos
- Comprobar por qué la página se carga desde abajo