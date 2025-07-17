import swaggerAutogen from "swagger-autogen";
import { port, default_user } from "../utils/constants.js";

const doc = {
  info: {
    title: "API REST de productos",
    description: "Una simple API REST de productos usando express.js.",
  },
  host: `localhost:${port}`,
  schemes: ["https", "http"],
  definitions: {
    SampleLogin: {
      $email: default_user.email,
      $password: default_user.password,
    },
    AddProduct: {
      $name: "6502",
      $price: 650.2,
      $categories: ["cpu"],
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["../../index.js"];

swaggerAutogen()(outputFile, routes, doc);
