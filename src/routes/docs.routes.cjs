const swaggerUIPath = require("swagger-ui-express");
const swaggerjsonFilePath = require("../utils/swagger-output.json");

const docsRoute = [
  swaggerUIPath.serve,
  swaggerUIPath.setup(swaggerjsonFilePath),
];

module.exports = docsRoute
