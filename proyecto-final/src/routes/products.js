import { Router } from "express";
import { body, param, query, oneOf, checkExact } from "express-validator";

import * as controller from "../controllers/products.js";

const validateId = param("id").toInt();
const validateProduct = [
  body("name").isAlphanumeric(),
  body("brand").isAlphanumeric(),
  body("price").isNumeric().toFloat(),
];
const validateSearch = [
  query("name").isAlphanumeric(),
  query("brand").isAlphanumeric(),
  query("minPrice").isNumeric().toFloat(),
  query("maxPrice").isNumeric().toFloat(),
];

const router = Router();
router.get("/", controller.getProducts);
router.get("/search", oneOf(validateSearch), controller.searchProduct);
router.get("/:id", validateId, controller.getProduct);
router.post("/", validateProduct, checkExact(), controller.postProduct);
router.put(
  "/:id",
  validateId,
  validateProduct,
  checkExact(),
  controller.putProduct
);
router.patch(
  "/:id",
  validateId,
  oneOf(validateProduct),
  controller.patchProduct
);
router.delete("/:id", validateId, controller.deleteProduct);

export default router;
