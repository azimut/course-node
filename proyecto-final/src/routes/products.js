import { Router } from "express";
import { body, param } from "express-validator";
import * as controller from "../controllers/products.js";

const router = Router();

router.get("/", controller.getProducts);
router.get("/search", controller.searchProduct);
router.get("/:id", param("id").toInt(), controller.getProduct);
router.post(
  "/",
  body("name").exists().notEmpty(),
  body("brand").exists().notEmpty(),
  body("price").exists().notEmpty().isFloat().toFloat(),
  controller.createProduct
);
router.put(
  "/:id",
  param("id").toInt(),
  body("name").exists().notEmpty(),
  body("brand").exists().notEmpty(),
  body("price").exists().notEmpty().isFloat().toFloat(),
  controller.updateProduct
);
router.patch("/:id", param("id").toInt(), controller.patchProduct);
router.delete("/:id", param("id").toInt(), controller.deleteProduct);

export default router;
