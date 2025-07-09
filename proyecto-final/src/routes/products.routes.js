import { Router } from "express";
import { exitOnError } from "../middlewares/validator.js";
import { body, param, query, oneOf, checkExact } from "express-validator";

import * as controller from "../controllers/products.controller.js";

const validateId = param("id").isInt().toInt();
const validateProduct = [
  body("name").isAlphanumeric(),
  body("categories").isArray(),
  body("price").isNumeric().toFloat(),
];
const validateSearch = oneOf([
  query("name").isAlphanumeric(),
  query("category").isAlphanumeric(),
  query("minPrice").isNumeric().toFloat(),
  query("maxPrice").isNumeric().toFloat(),
]);

const router = Router();
router.get("/products", controller.getProducts);
router.get(
  "/products/search",
  validateSearch,
  exitOnError,
  controller.searchProduct
);
router.get("/products/:id", validateId, exitOnError, controller.getProduct);
router.delete(
  "/products/:id",
  validateId,
  exitOnError,
  controller.deleteProduct
);
router.post(
  "/products",
  validateProduct,
  checkExact(),
  exitOnError,
  controller.postProduct
);
router.put(
  "/products/:id",
  validateId,
  validateProduct,
  checkExact(),
  exitOnError,
  controller.putProduct
);
router.patch(
  "/products/:id",
  validateId,
  oneOf(validateProduct),
  exitOnError,
  controller.patchProduct
);

export default router;
