| Statements                                                                                      |
| ----------------------------------------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-88.61%25-brightgreen.svg 'Make me better!') |

# 👨‍💻 Professional Availability Management Application.

<br>

## 🛠 stack

Main tools used in this project:

|                                          Node                                          |                                               Express                                               |                                            Sequelize                                             |                                                Postgres                                                |                                        Jest                                         |                                          Swagger                                           |
| :------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: |
| [<img src="./src/assets/node-logo.png" alt="Node" width="50"/>](https://nodejs.org/en) | [<img src="./src/assets/express-logo.png" alt="Express" width="50"/>](https://expressjs.com/pt-br/) | [<img src="./src/assets/sequelizelogo.svg" alt="Sequelize" width="50"/>](https://sequelize.org/) | [<img src="./src/assets/postgresql-logo.png" alt="Postgres" width="50"/>](https://www.postgresql.org/) | [<img src="./src/assets/jest-logo.png" alt="Jest" width="50"/>](https://jestjs.io/) | [<img src="./src/assets/swagger-logo.png" alt="Swagger" width="50"/>](https://swagger.io/) |

## ⚠️ Requirements

- Node

## 🗃 Environment variables

Use the `.env` file.

All variables necessary to run this project:

| Variable                    | Description                                       |
| --------------------------- | ------------------------------------------------- |
| `DB_PORT=5432`              | Database host port. Default postgres port is 5432 |
| `DB_HOST=postgres`          | Database host                                     |
| `DB_USER=postgres`          | Database username.                                |
| `DB_PASSWORD=postgres`      | Database password                                 |
| `DB_NAME=time_slot_manager` | Database name                                     |
| `DB_DIALECT=postgres`       | Database dialect                                  |
|                             |

## 🎬 Instalation

- Create a postgres database
- Connect to database
- Set environment variables in .env file
- Install dependencies

```sh
npm install
```

- Run the migrations with the command:

```sh
npx sequelize-cli db:migrate
```

- Run the application:

```sh
npm run start
```

### 📄 Swagger

to know about endpoint documentation you can accesss on [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

## 📨 Status codes

The API is designed to return different status codes according to context and
action. This way, if a request results in an error, the caller is able to get
insight into what went wrong.

The following table gives an overview of how the API functions generally behave.

| Request type  | Description                                                                                                      |
| ------------- | ---------------------------------------------------------------------------------------------------------------- |
| `GET`         | Access one or more resources and return the result as JSON.                                                      |
| `POST`        | Return `201 Created` if the resource is successfully created and return the newly created resource as JSON.      |
| `GET` / `PUT` | Return `200 OK` if the resource is accessed or modified successfully. The (modified) result is returned as JSON. |
| `DELETE`      | Returns `200 ok` if the resource was deleted successfully.                                                       |

The following table shows the possible return codes for API requests.

| Return values      | Description                                                                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `200 OK`           | The `GET`, `PUT` or `DELETE` request was successful, the resource(s) itself is returned as JSON.                                                |
| `400 Bad Request`  | A required attribute of the API request is missing.                                                                                             |
| `401 Unauthorized` | The user is not authenticated, a valid token is necessary. See swagger for the authentication route.                                            |
| `403 Forbidden`    | The request is not allowed, the user is not allowed to perform this operation. Only professionals can create, update or delete an availability. |
| `404 Not Found`    | A resource could not be accessed, e.g., an ID for a resource could not be found.                                                                |
| `409 Conflict`     | A conflicting resource already exists, e.g., creating an availability that already exists.                                                      |
| `500 Server Error` | While handling the request, something went wrong server-side.                                                                                   |

## Path parameters

If an endpoint has path parameters, the documentation shows them with a preceding colon.

For example:

```plaintext
 GET /availabilities/professional/:id
```

The `:id` path parameter needs to be replaced with the professional ID. The colons `:` should not be included.

## ❓ Unknown route

When you try to access an API URL that does not exist, you will receive 404 Not Found.

## 🗂 Folder structure

```bash
📦 src
 ├── 📂 assets
 ├── 📂 config
 ├── 📂 migrations
 ├── 📂 controllers
 ├── 📂 docs
 ├── 📂 middlewares
 ├── 📂 models
 ├── 📂 repositories
 ├── 📂 routes
 ├── 📂 services
 ├── 📂 tests
 ├── 📂 utils
 ├── 📜 app.js
 ├── 📜 server.js
```

### 🔹 Entities Details

```bash

 ├──  professionals
 ├──  users
 ├──  availabilities
 ├──  bookings
```

Example of files for an entity

#### Ex:

> `availabilityController.js`
>
> `availabilityService.js`
>
> `availabilityRepository.js`
>
> `availabilityRoutes.js`

### 🔹 Middlewares

Here we'll find our authentication middleware.

### 🔹 Migrations

Here we'll find our existing migration files with schema changes we made.

### 🔹 Utils

Here we'll find our helpers funtions.

## 📋 Tests

For tests this application uses [Jest](https://jestjs.io/en/).

Running tests:

```sh
npm run test
npm run test:coverage
```

## 📋 Additional requirements:

- Password encryption
- Authentication
- Swagger

## Business rules:

- Professional creation is necessary
- User creation is necessary
- Both user and professional must authenticate to consume resources
- Only a professional can create, update and delete an availability
- A professional cannot create, update or delete an availability that belongs to another professional
- A professional can only update dayOfWeek of an availability
- Both user and professional can list all availability, list availability by ID and list all availability of a professional by professional ID
- Only users can book a session
