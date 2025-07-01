import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  patchProduct,
  updateProduct,
  searchProduct,
} from "../controllers/products.js";

const router = Router();

router.get("/", getProducts);
router.get("/search", searchProduct);
router.get("/:id", param("id").toInt(), getProduct);
router.post(
  "/",
  body("name").exists().notEmpty(),
  body("brand").exists().notEmpty(),
  body("price").exists().notEmpty().isFloat().toFloat(),
  createProduct
);
router.put(
  "/:id",
  param("id").toInt(),
  body("name").exists().notEmpty(),
  body("brand").exists().notEmpty(),
  body("price").exists().notEmpty().isFloat().toFloat(),
  updateProduct
);
router.patch("/:id", param("id").toInt(), patchProduct);
router.delete("/:id", param("id").toInt(), deleteProduct);

export default router;
