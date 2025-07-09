# proyecto-final-ecommerce

**descripcion y alcance del proyecto**


## Instalacion y despliege

Instalacion de las dependencias necesarias, edicion de las credenciales de Firebase (nuestra base de datos), y lanzamiento el servidor.

``` shellsession
$ npm install
$ nano .env
$ npm start
```

## Tecnologias usadas

- node.js
  - [express](https://www.npmjs.com/package/express): como web framework
  - [cors](https://www.npmjs.com/package/cors): para configurar CORS headers
  - [http-status](https://www.npmjs.com/package/http-status): para referenciar estados HTTP mediante sus nombres
  - [express-validator](https://www.npmjs.com/package/express-validator): para castear, validar y manejar errores de usuario
  - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
  - [dotenv](https://www.npmjs.com/package/dotenv)

- El entorno de desarrollo usa herramientas de terminal para testear y validar la respuesta del API cada vez que cambiamos el codigo.
  - [entr](https://github.com/eradman/entr) - ejecuta node y las pruebas cuando detecta cambios en los archivos de codigo
  - [curlie](https://github.com/rs/curlie) - cliente http para la terminal
  - [jq](https://github.com/jqlang/jq/) - lenguaje para interpretar y validar la respuesta JSON recibida
  - Para ejecutar las pruebas usar: `$ make dev`

## Descripcion

Ejemplo de un producto.

``` json
{
    "id": 1,
    "name": "8048",
    "price": 133.7,
    "categories": [
      "microcontroller",
      "dip"
    ]
}
```

## Objetivo
## Uso del API

### Descripcion General

| metodo | ruta                 | descripcion                                               |
|--------|----------------------|-----------------------------------------------------------|
| POST   | /auth/login          | given credentials, returns a JWT token                    |
| GET    | /api/products        | devuelve una lista de todos los productos                 |
| POST   | /api/products        | crea un nuevo producto                                    |
| GET    | /api/products/search | busca por productos que coincidan con los criterios dados |
| GET    | /api/products/:id    | devuelve el producto pedido                               |
| DELETE | /api/products/:id    | elimina el producto dado                                  |
| PUT    | /api/products/:id    | actualiza el producto dado                                |
| PATCH  | /api/products/:id    | actualiza un campo en el producto dado                    |

### POST   /auth/login

``` http
POST /auth/login HTTP/1.1
Content-Type: application/json

{
    "email": "user@email.com",
    "password": "stronPass123"
}
```

``` http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Content-Length: 183
Content-Type: application/json; charset=utf-8
X-Powered-By: Express

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGVtYWlsLmNvbSIsImlhdCI6MTc1MjA3MDk0OCwiZXhwIjoxNzUyMDc0NTQ4fQ.JhBE_6zGnDkR_lPbYpBXO5l1UXR-VOY-AeCCUrMp4eA"
}
```

### GET    /api/products
### POST   /api/products
### GET    /api/products/search
### GET    /api/products/:id
### DELETE /api/products/:id
### PUT    /api/products/:id
### PATCH  /api/products/:id

## Materiales Y Recursos Adicionales

- [Estados de respuesta HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)
- [Metodos HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods)
- https://en.wikipedia.org/wiki/PATCH_(HTTP)
- https://expressjs.com/en/api.html
- Sitios usados como referencia del comportamiento tipico de una API:
  - https://httpstat.us/
  - https://reqres.in/
  - https://fakestoreapi.com/docs
- Para saber que version de Node usar en el desarrollo.
  - https://vercel.com/docs/functions/runtimes/node-js/node-js-versions
  - https://render.com/docs/node-version#history-of-default-nodejs-versions
