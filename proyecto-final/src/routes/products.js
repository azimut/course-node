import { Router } from "express";
import {
  body,
  param,
  query,
  oneOf,
  checkExact,
  validationResult,
} from "express-validator";

import * as controller from "../controllers/products.js";

const validateId = param("id").isInt().toInt();
const validateProduct = [
  body("name").isAlphanumeric(),
  body("brand").isAlphanumeric(),
  body("price").isNumeric().toFloat(),
];
const validateSearch = oneOf([
  query("name").isAlphanumeric(),
  query("brand").isAlphanumeric(),
  query("minPrice").isNumeric().toFloat(),
  query("maxPrice").isNumeric().toFloat(),
]);
const exitOnError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};

const router = Router();
router.get("/", controller.getProducts);
router.get("/search", validateSearch, exitOnError, controller.searchProduct);
router.get("/:id", validateId, exitOnError, controller.getProduct);
router.delete("/:id", validateId, exitOnError, controller.deleteProduct);
router.post(
  "/",
  validateProduct,
  checkExact(),
  exitOnError,
  controller.postProduct
);
router.put(
  "/:id",
  validateId,
  validateProduct,
  checkExact(),
  exitOnError,
  controller.putProduct
);
router.patch(
  "/:id",
  validateId,
  oneOf(validateProduct),
  exitOnError,
  controller.patchProduct
);

export default router;
