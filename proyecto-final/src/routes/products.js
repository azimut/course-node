import { Router } from "express";
import status from "http-status";
import {
  addNewProduct,
  deleteProduct,
  getProduct,
  getProducts,
  patchProduct,
  updateProduct,
  searchProduct,
} from "../controllers/products.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.get("/search", searchProduct);
router.post("/", addNewProduct);
router.put("/:id", updateProduct);
router.patch("/:id", patchProduct);
router.delete("/:id", deleteProduct);

export default router;
