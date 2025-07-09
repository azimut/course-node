import jwt from "jsonwebtoken";
import { secret_key } from "./constants.js";

export function generateToken({ id, email }) {
  return jwt.sign({ id, email }, secret_key, { expiresIn: "1h" });
}
