import { Router } from "express";
import status from "http-status";

const router = Router();

router.get("/", (_req, res) => {
  const products = [];
  res.json(products);
});

router.get("/:id", (req, res) => {
  const product = {};
  if (product) {
    res.json(product);
  } else {
    res.status(status.NOT_FOUND).json({ error: "product not found" });
  }
});

router.get("/search", () => {});

router.put("/:id", (req, res) => {
  const exists = true;
  if (exists) {
    res.status(status.NO_CONTENT).send();
  } else {
    res.status(status.CREATED);
  }
});

router.patch("/:id", (req, res) => res.status(status.NO_CONTENT).send());

router.post("/", (req, res) => {
  try {
    const { name, price } = req.body;
    const products = [];
    const product = { name, price };
    const id = 999;
    product.id = id;
    products.push(product);
    res.status(status.CREATED).json(products);
  } catch (err) {
    res.status(status.NOT_FOUND).json({ error: "not enough params" });
  }
});

router.delete("/:id", (req, res) => {
  res.status(status.ACCEPTED).json({ message: "sucessfully deleted" });
});

export default router;
