import express from "express";
import cors from "cors";
import http from "http-status";
import products from "./src/routes/products.js";

const PORT = 3030;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/products", products);
app.use((_req, res) =>
  res.status(http.NOT_FOUND).json({ error: http[http.NOT_FOUND] })
);

app.listen(PORT, () => console.log(`http://0.0.0.0:${PORT}`));
