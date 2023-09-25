# TutorConnect

<hr>

## TODO
- [x] Registro de usuarios
- [x] Inicio de sesión de usuarios
- [X] Subir cursos
- [X] Mostrar cursos
- [X] Página de cursos
- [X] Editar cursos
- [X] Eliminar cursos
- [X] Conteo de cursos y usuarios registrados
- [ ] Añadir roles a cuentas

## Instalacion

<!-- INSTALACIÓN LOCAL -->
<details>
<summary>Instalación local</summary>

****
Clonar repositorio de [GitHub](https://github.com/xChoki/TutorConnect):

```sh
gh repo clone xChoki/TutorConnect
```
Instalar [node.js](https://nodejs.org/dist/v18.17.1/node-v18.17.1-x64.msi):

En una terminal en la carpeta clonada nos dirigimos a la carpeta client
```sh
cd client
```
Instalamos pnpm
```sh
npm install -g pnpm
```
Instalamos dependencias
```sh
pnpm i
```
Iniciamos servidor React+Vite
```sh
pnpm run dev
```
****
En una terminal nueva en la carpeta clonada nos dirigimos a la carpeta api
```sh
cd api
```
Instalamos dependencias
```sh
npm i
```
Instalamos nodemon
```sh
npm install -g nodemon
```
Iniciamos servidor Node
```sh
nodemon index.js
```
</details>

<!-- INSTALACIÓN DOCKER -->
<details>
<summary>Instalación Docker</summary>

****
Clonar repositorio de [GitHub](https://github.com/xChoki/TutorConnect):

```sh
gh repo clone xChoki/TutorConnect
```
Instalar [node.js](https://nodejs.org/dist/v18.17.1/node-v18.17.1-x64.msi):

Instalar [Docker Desktop](https://www.docker.com/products/docker-desktop/):

En el directorio padre para iniciar se ejecuta

```sh
docker-compose -f docker-compose-dev.yml up
```

En el directorio padre para cerrar se ejecuta

```sh
docker-compose -f docker-compose-dev.yml down
```

Si desean limpiar su docker, ejecutar esto para eliminarlo todo

```sh
docker system prune -a --volumes
```

</details>

<!-- DEPENDENCIAS INSTALADAS-->
## Dependencias

- Client:
  - react
  - react-dom
  - standard
  - tailwindcss
  - flowbite
  - react-router-dom
  - axios

- API:
  - express
  - cors
  - mongoose
  - dotenv
  - bcryptjs
  - jsonwebtoken
  - cookie-parser
  - node-schedule
