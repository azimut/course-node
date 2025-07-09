import express from "express";
import cors from "cors";
import http from "http-status";
import { port } from "./src/utils/constants.js";
import { requireAuth } from "./src/middlewares/authentication.js";
import productsRoute from "./src/routes/products.routes.js";
import authRoute from "./src/routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", requireAuth, productsRoute);
app.use("/auth", authRoute);
app.use((_req, res) =>
  res.status(http.NOT_FOUND).json({ error: http[http.NOT_FOUND] })
);

app.listen(port, () => console.log(`http://0.0.0.0:${port}`));
