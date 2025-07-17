import { Router } from "express";
import * as controller from "../controllers/auth.controller.js";
import * as validate from "../middlewares/auth.validator.js";

const router = Router();
router.post("/login", validate.postLogin, controller.login);
export default router;
