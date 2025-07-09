import { Router } from "express";
import { body, checkExact } from "express-validator";
import { exitOnError } from "../middlewares/validator.js";
import * as controller from "../controllers/auth.controller.js";

const router = Router();
router.post(
  "/login",
  body("email").isEmail(),
  body("password").isAlphanumeric(),
  checkExact(),
  exitOnError,
  controller.login
);
export default router;
