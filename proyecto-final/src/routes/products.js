import { Router } from "express";
import { body, param, query, oneOf } from "express-validator";

import * as controller from "../controllers/products.js";

const router = Router();

router.get("/", controller.getProducts);
router.get(
  "/search",
  oneOf([
    query("name").isAlphanumeric().notEmpty(),
    query("brand").isAlphanumeric().notEmpty(),
    query("minPrice").isNumeric().toFloat(),
    query("maxPrice").isNumeric().toFloat(),
  ]),
  controller.searchProduct
);
router.get("/:id", param("id").toInt(), controller.getProduct);
router.post(
  "/",
  body("name").isAlphanumeric().notEmpty(),
  body("brand").isAlphanumeric().notEmpty(),
  body("price").isNumeric().toFloat(),
  controller.createProduct
);
router.put(
  "/:id",
  param("id").toInt(),
  body("name").isAlphanumeric().notEmpty(),
  body("brand").isAlphanumeric().notEmpty(),
  body("price").isNumeric().toFloat(),
  controller.updateProduct
);
router.patch(
  "/:id",
  param("id").toInt(),
  oneOf([
    body("name").isAlphanumeric().notEmpty(),
    body("brand").isAlphanumeric().notEmpty(),
    body("price").isNumeric().toFloat(),
  ]),
  controller.patchProduct
);
router.delete("/:id", param("id").toInt(), controller.deleteProduct);

export default router;
