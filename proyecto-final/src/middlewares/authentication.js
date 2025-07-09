import jwt from "jsonwebtoken";
import http from "http-status";
import { secret_key } from "../utils/constants.js";

export function requireAuth(req, res, next) {
  if (!req.headers.authorization)
    return res.status(http.UNAUTHORIZED).json({ error: "Missing token." });

  const token = req.headers["authorization"].split(" ")[1]; // Bearer ...

  if (!token)
    return res.status(http.UNAUTHORIZED).json({ error: "Invalid token." });

  jwt.verify(token, secret_key, (err) => {
    if (err)
      return res.status(http.FORBIDDEN).send({ error: "Invalid token." });
    next();
  });
}
