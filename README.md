# proyecto-final-ecommerce

Este proyecto implementa una API REST en `Node.js` usando `Express`. Cuenta con autenticacion mediante `JWT` tokens. `Firestore` para persistencia. Y esta desplegada en `Vercel` en la siguiente direccion: https://course-node-azimut1s-projects.vercel.app/

## Instalacion y despliege local

1. Instalacion de las dependencias necesarias.
   ``` shellsession
   $ npm install
   ```

2. Edicion de las credenciales de Firebase.
        ``` shellsession
        $ nano .env
        PORT=3030
        JWT_SECRET_KEY=...
        FIREBASE_API_KEY=...
        FIREBASE_AUTH_DOMAIN=...
        FIREBASE_STORAGE_BUCKET=...
        FIREBASE_APP_ID=...
        ```

3. Lanzamiento del servidor.
  ``` shellsession
  $ npm start
  ```

4. Para realizar pruebas a la API local.
  ``` shellsession
  $ make test
  ```

5. Para realizar las pruebas a una API remota.
  ``` shellsession
  $ make test URL=https://course-node-azimut1s-projects.vercel.app
  ```

6. Alternativamente, podemos lanzar el servidor en modo **desarrollo**. Que integra la recarga del servidor y el testeo continuo.
  ``` shellsession
  $ make dev
  ```

## Tecnologias usadas

- node.js
  - [express](https://www.npmjs.com/package/express): como web framework
  - [cors](https://www.npmjs.com/package/cors): para configurar CORS headers
  - [http-status](https://www.npmjs.com/package/http-status): para referenciar estados HTTP mediante sus nombres
  - [express-validator](https://www.npmjs.com/package/express-validator): para castear, validar y manejar errores de usuario
  - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
  - [dotenv](https://www.npmjs.com/package/dotenv)

- El entorno de **desarrollo** usa herramientas de consola para testear y validar la respuestas del API. Triggereado por cambiamos en el codigo.
  - [Make](https://www.gnu.org/software/make/manual/make.html) - lenguaje de scripting usado para lanzar cada comando de prueba
  - [entr](https://github.com/eradman/entr) - ejecuta node junto con las pruebas de API en cada cambio de codigo
  - [curlie](https://github.com/rs/curlie) - cliente http para la terminal
  - [jq](https://github.com/jqlang/jq/) - lenguaje para interpretar y validar la respuestas JSON recibidas

## Descripcion de la implementacion

La API REST implementada en este proyecto es una simple API que mantiene un inventario de productos. Cada uno con su precio y perteneciente a una categoria.

Ejemplo de un producto:
``` json
{
    "id": "Tlp6Q1FzQiiVw08hnCFy",
    "categories": [
        "cpu",
        "dip"
    ],
    "price": 80,
    "name": "Z80"
},
```

## Uso del API

| metodo | ruta                 | descripcion                                               |
|--------|----------------------|-----------------------------------------------------------|
| POST   | /auth/login          | dado credenciales, devuelve un token JWT                    |
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

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGVtYWlsLmNvbSIsImlhdCI6MTc1MjA3MDk0OCwiZXhwIjoxNzUyMDc0NTQ4fQ.JhBE_6zGnDkR_lPbYpBXO5l1UXR-VOY-AeCCUrMp4eA"
}
```

### GET    /api/products

``` http
GET /api/products HTTP/1.1
Authorization: Bearer eyJhbGciOi....YCoOalTs
```

``` http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8


[
    {
        "id": "BANDsmB7b85yRgnx9BuD",
        "categories": [
            "microcontroller",
            "dip"
        ],
        "name": "8048",
        "price": 133.7
    },
]

```

### POST   /api/products

``` http
POST /api/products HTTP/2
authorization: Bearer eyJjda...WhvAXM
content-type: application/json

{
    "categories": [
        "cpu"
    ],
    "name": "6502",
    "price": "650.2"
}

```

``` http
HTTP/2 201
access-control-allow-origin: *
content-type: application/json; charset=utf-8

{
    "categories": [
        "cpu"
    ],
    "name": "6502",
    "price": 650.2,
    "id": "M4rBiczs0emKNzIgbqwU"
}
```

### GET    /api/products/search

``` http
GET /api/products/search?name=555 HTTP/1.1
Authorization: Bearer eyJhbGciOiJI....T1AYRhMWEVlntFY
```

``` http
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8

[
    {
        "id": "zZPkuHOndxqXglZQnTvy",
        "price": 5.55,
        "name": "555",
        "categories": [
            "dip",
            "timer",
            "sop"
        ]
    }
]
```

### GET    /api/products/:id

``` http
GET /api/products/zZPkuHOndxqXglZQnTvy HTTP/1.1
Authorization: Bearer eyJhbGciOi....s7MX2Sui9ykJYrQ
```

``` http
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8

{
    "id": "zZPkuHOndxqXglZQnTvy",
    "price": 5.55,
    "name": "555",
    "categories": [
        "dip",
        "timer",
        "sop"
    ]
}
```

### DELETE /api/products/:id

``` http
DELETE /api/products/zZPkuHOndxqXglZQ HTTP/1.1
Authorization: Bearer eyJhbGci....x4Ex-EoedwSPrGU
```

``` http
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: *
X-Powered-By: Express
```

### PUT    /api/products/:id

``` http
PUT /api/products/M4rBiczs0emKNzIgbqwU HTTP/2
authorization: Bearer eyJhbGciOiJIUzI1....yKUACDWhvAXM
content-type: application/json

{
    "categories": [
        "cpu"
    ],
    "name": "6502C",
    "price": "650.2"
}
```

``` http
HTTP/2 204
access-control-allow-origin: *
```

### PATCH  /api/products/:id

``` http
PATCH /api/products/M4rBiczs0emKNzIgbqwU HTTP/2
authorization: Bearer eyJhbG.....SYmyKUACDWhvAXM
content-type: application/json

{
    "price": "65.02"
}
```

``` http
HTTP/2 204
access-control-allow-origin: *
```

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
