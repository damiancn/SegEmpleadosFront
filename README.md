# SegEmpleadosFront

Este proyecto es una implementación de un sistema de autenticación basado en JSON Web Tokens (JWT) usando Angular v16.2.14

## Descripción

El objetivo de este proyecto es un examen el cual Incluye:

### Frontend

- Node.js 14.x o superior
- npm 6.x o superior

## Instalación

### Clonar el repositorio

git clone https://github.com/damiancn/SegEmpleadosFront.git

### Procedimiento

Este proyecto tiene que ser abierto y ejectuado a traves de localhost
accediendo por terminal a la raiz del proyecto y abrir con Ctrl + J en caso de usar VSCode y ejecutar:

ng serve

Tomara un tiempo en compilar para que entres a traves de tu navegador por [localhost:4200](http://localhost:4200)
o podras escoger otro puerto con el comando
ng serve --port
escribiendo el puerto por la cual deseas que se compile el proyecto

En el caso de necesitar cambiar las variables de entorno para la conexión con el backend es a a traves de los archivos de enviroment
localizada en src/enviroments

El proyecto se abrira en la ruta /login 
Las credenciales seran las siguientes:
Usuario: "Administrador"
Contraseña: "admin"

No es necesario realizar algun cambio en tu base de Datos para poder navegar en la aplicación
Pero es necesario ejecutar el Backend primero para que las peticiones HTTP se ejecuten correctamente
