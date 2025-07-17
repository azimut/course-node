import http from "http-status";
import { validationResult } from "express-validator";
import { body, param, query, oneOf, checkExact } from "express-validator";

export function exitOnError(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(http.BAD_REQUEST).json({ errors: errors.array() });
  next();
}

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
