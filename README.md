# TutorConnect

<hr>

## TODO
- [x] Registro de usuarios
- [x] Inicio de sesión de usuarios
- [X] Subir cursos
- [X] Mostrar cursos
- [ ] Página de cursos
- [ ] Editar cursos
- [ ] Eliminar cursos
- [ ] Añadir roles a cuentas

## Instalacion

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
