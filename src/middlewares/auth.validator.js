import { body, checkExact } from "express-validator";
import { exitOnError } from "./validator.js";

export const postLogin = [
  body("email").isEmail(),
  body("password").isAlphanumeric(),
  checkExact(),
  exitOnError,
];
