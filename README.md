# Backend para la Aplicación de Árboles - Roket

Este repositorio contiene el backend para la aplicación de árboles de Roket. El backend proporciona una API RESTful para acceder a los datos de árboles, ubicaciones, fotos y comentarios almacenados en la base de datos.

## Requisitos

- Node.js
- PostgreSQL

## Instalación

1. Clona este repositorio en tu máquina local.
2. Ejecuta `npm install` para instalar las dependencias.
3. Configura las variables de entorno en un archivo `.env`.

## Configuración de la base de datos

El proyecto utiliza una base de datos PostgreSQL. Asegúrate de tener acceso a una instancia de PostgreSQL.

1. Crea una base de datos con el nombre `roket`.
2. Ejecuta los scripts SQL proporcionados en la carpeta `/database` para crear las tablas necesarias.

## Ejecución

Ejecuta `npm start` para iniciar el servidor. El backend estará disponible en `http://localhost:3000`.

## Endpoints

- `/arboles`: Obtiene todos los árboles.
- `/arboles/:arbol_id/ubicacion`: Obtiene la ubicación de un árbol por su ID.
- `/fotos/:arbol_id`: Obtiene las fotos de un árbol por su ID.
- `/comentarios/:arbol_id`: Obtiene los comentarios de un árbol por su 

# tarea_alvaro
