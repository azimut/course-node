import { Router } from "express";
import status from "http-status";
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
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.patch("/:id", patchProduct);
router.delete("/:id", deleteProduct);

export default router;
