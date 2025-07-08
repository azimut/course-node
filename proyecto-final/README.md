# proyecto-final-ecommerce

**descripcion y alcance del proyecto**

## Instalación

``` shellsession
$ npm install
```

## Ejecucion

``` shellsession
$ npm start
```

| http path            | method | description                            |
|----------------------|--------|----------------------------------------|
| /api/products        | GET    | gets all products                      |
| /api/products        | POST   | creates a new product                  |
| /api/products/search | GET    | searchs                                |
| /api/products/:id    | GET    | gets an existing product               |
| /api/products/:id    | DELETE | deletes an existing product            |
| /api/products/:id    | PUT    | updates an existing product            |
| /api/products/:id    | PATCH  | updates a field on an existing product |

## Objetivo
## Configuration
## Tecnologias

- node.js
  - [express](https://www.npmjs.com/package/express): como web framework
  - [cors](https://www.npmjs.com/package/cors): para configurar CORS headers
  - [http-status](https://www.npmjs.com/package/http-status): para referirme a los estados http a traves de mnemonicos
  - [express-validator](https://www.npmjs.com/package/express-validator): para castear, validar y manejar errores de usuario

## Desarrollo

- [entr](https://github.com/eradman/entr) - para relanzar node y las pruebas a la API
- [curlie](https://github.com/rs/curlie) - cliente http para la terminal
- [jq](https://github.com/jqlang/jq/) -

## Referencias

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
