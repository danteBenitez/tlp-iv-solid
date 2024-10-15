# REST API con SOLID

## Situación

Se va a desarrollar una API REST para una concesionaria de vehículos que gestiona tanto vehículos
como clientes. Los vehículos tienen propiedades como id, marca, modelo, año y precio, mientras
que los clientes tienen id, nombre, email y teléfono. La API debe seguir los principios SOLID para
que sea mantenible, escalable y modular.

## Descripción del proyecto

La API REST soporta las siguientes operaciones concernientes a clientes y vehículos:

- Creación
- Lectura (por ID o todos)
- Actualización
- Eliminación

Las rutas son:

- `/clients`:
  - `GET /`: Obtiene todos los clientes
  - `GET /:id`: Obtiene un cliente por ID
  - `POST /`: Crea un cliente
  - `PUT /:id`: Actualiza un cliente por ID
- `/vehicles`:
  - `GET /`: Obtiene todos los vehículos
  - `GET /:id`: Obtiene un vehículo por ID
  - `POST /`: Crea un vehículo
  - `PUT /:id`: Actualiza un vehículo por ID

## Requisitos de ejecución

- Node.js
- npm
- Un servidor Postgres o MongoDB

## Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/danteBenitez/tlp-iv-solid
```

2. Instalar las dependencias

````bash

```bash
cd tlp-iv-solid
npm install
````

3. Completa las variables de entorno en un archivo `.env.dev` o `.env.prod` en la raíz del proyecto

```bash
DB_DIALECT=         # El proyecto soporta 'postgres' y 'mongo'
DB_HOST=            # Host de la base de datos
DB_PORT=            # Puerto de la base de datos
DB_USER=            # Usuario de la base de datos
DB_PASSWORD=        # Contraseña del usuario
DB_NAME=            # Nombre de la base de datos
PORT=               # Puerto de la aplicación
SALT_ROUNDS=        # Número de rondas a usar para la encriptación de las contraseñas
JWT_SECRET=         # Secreto para cifrar JWTs
```

4. Inicia el proyecto en modo desarrollo

```bash
npm run dev
```

Esto leerá las variables de entorno del archivo `.env.dev` e iniciará el servidor.

5. Inicia el proyecto en modo producción

```bash
npm run start
```

Esto leerá las variables de entorno del archivo `.env.prod` e iniciará el servidor.
