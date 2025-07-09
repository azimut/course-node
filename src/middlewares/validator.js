import http from "http-status";
import { validationResult } from "express-validator";

export function exitOnError(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(http.BAD_REQUEST).json({ errors: errors.array() });
  next();
}
