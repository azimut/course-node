# proyecto-final-ecommerce

Este proyecto implementa un ejemplo de una REST API en Node.js (Express). Usando JWT para autenticacion. Y Firestore para persistencia. Desplegado en Vercel.

## Instalacion y despliege local

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

La REST API implementada en este proyecto. 

Ejemplo de un producto.

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

``` http
GET /api/products HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGVtYWlsLmNvbSIsImlhdCI6MTc1MjA3MTIxOSwiZXhwIjoxNzUyMDc0ODE5fQ.TkJAQtPRACfog35QW1WD6ym5RkPLdElP1ZyYCoOalTs
```

``` http
HTTP/1.1 200 OK
X-Powered-By: Express
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
### GET    /api/products/search

``` http
GET /api/products/search?name=555 HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGVtYWlsLmNvbSIsImlhdCI6MTc1MjA3MTYzMSwiZXhwIjoxNzUyMDc1MjMxfQ.lSFuT1lP_cuMofAE7i1JgoxFCyLNT1AYRhMWEVlntFY
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
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGVtYWlsLmNvbSIsImlhdCI6MTc1MjA3MTc1MywiZXhwIjoxNzUyMDc1MzUzfQ.rf8v7WXnkWB6LUBap0xjcdNt2aaDs7MX2Sui9ykJYrQ
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
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGVtYWlsLmNvbSIsImlhdCI6MTc1MjA3MjA2MCwiZXhwIjoxNzUyMDc1NjYwfQ.BwtZFDABgyOX3P-QL-lyTw7aCFlsx4Ex-EoedwSPrGU
```

``` http
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: *
X-Powered-By: Express
```

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
