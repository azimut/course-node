import express from "express";
import cors from "cors";
import products from "./routes/products.js";

const PORT = 3030;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/products", products);

app.use((_req, res) => res.status(404).json({ error: "undefined path" }));
app.listen(PORT, () => console.log(`http://0.0.0.0:${PORT}`));
