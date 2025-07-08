import express from "express";
import cors from "cors";
import http from "http-status";
import products from "./src/routes/products.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", products);
app.use((_req, res) =>
  res.status(http.NOT_FOUND).json({ error: http[http.NOT_FOUND] })
);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`http://0.0.0.0:${PORT}`));
