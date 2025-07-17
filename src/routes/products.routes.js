import { Router } from "express";
import * as validate from "../middlewares/products.validator.js";
import * as controller from "../controllers/products.controller.js";

const router = Router();
router.get("/products", controller.getProducts);
router.get("/products/search", validate.search, controller.searchProduct);
router.get("/products/:id", validate.get, controller.getProduct);
router.delete("/products/all", controller.deleteProducts);
router.delete("/products/:id", validate.delete_, controller.deleteProduct);
router.post("/products/create", validate.post, controller.postProduct);
router.put("/products/:id", validate.put, controller.putProduct);
router.patch("/products/:id", validate.patch, controller.patchProduct);
export default router;
