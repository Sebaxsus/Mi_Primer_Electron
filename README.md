# Mi primer proyecto usando Electron.js

## Descripción General.
Este proyecto tiene la finalidad de crear una APP completa para **Desktop** que lleva la trazabilidad de:

1. La finanzas de la casa.
2. Las fechas aproximadas en las que llegan los recibos de los servicios públicos.
3. Mostrar Gráficas y Resúmenes de desempeño. (Si es con IA mejor)

Para ello Esta app esta consta de Dos partes importantes La **Interfaz de usuario** (Front-End) y El **Servidor** (Back-End),

El Front-End se encarga de Facilitar el uso de la aplicación haciendo uso de técnicas de **E**xperiencia de **U**suario mas conocido por sus Siglas en Ingles (**U**ser **E**xpirience -> UX) en las cuales se tienen en cuenta cosas como la naturalidad de los elementos, Es decir que tan natural y sencillo se hace para una persona usar y entender lo que hace cada elemento de la Interfaz de Usuario,

Otra de las cosas clave de el Front-End es el hecho de tener en cuenta cuanto tiempo de respuesta tiene en promedio la aplicación y que tanto se demora en hacer las operaciones.

Por esto el Front-End se diseño usando un sistema:

1. Redundante:
    - Sistema de guardado local y sistema de sincronización en red
2. Fiable:
    - Sistema que funciona sin conexión al servidor
    - Intento de Sincronización de datos cada hora
3. Accesible:
    - Se tiene en cuenta cosas como el **Accessibility Tree**, Usando el HTML Semántico.
    - Aria-Label y Aria-Role

El **Back-End** se encarga de persistir los datos de manera Global (Para todos lo clientes/Usuarios), Filtrar los datos para evitar guardar los mismos datos dos veces y En un futuro guardara las imágenes de forma Centralizada para que todos los clientes puedan acceder a ellas sin tener que descargarlas.

## Tabla de Contenidos

## 