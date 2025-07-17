import { exitOnError } from "./validator.js";
import { body, param, query, oneOf, checkExact } from "express-validator";

const validateId = param("id").isAlphanumeric();
const validateProduct = [
  body("name").isAlphanumeric(),
  body("categories").isArray(),
  body("price").isNumeric().toFloat(),
];

export const get = [validateId, exitOnError];
export const delete_ = [validateId, exitOnError];
export const post = [validateProduct, checkExact(), exitOnError];
export const search = [
  oneOf([
    query("name").isAlphanumeric(),
    query("category").isAlphanumeric(),
    query("minPrice").isNumeric().toFloat(),
    query("maxPrice").isNumeric().toFloat(),
  ]),
  exitOnError,
];
export const put = [validateId, validateProduct, checkExact(), exitOnError];
export const patch = [validateId, oneOf(validateProduct), exitOnError];
