import { Router } from "express";

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
    res.status(404).json({ error: "product not found" });
  }
});
router.post("/", (req, res) => {
  try {
    const { name, price } = req.params;
    const id = 999;
    res.status(201).json({ id });
  } catch (err) {
    res.status(400).json({ error: "not enough params" });
  }
});
router.delete("/:id", (req, res) => {
  res.status(202).json({ message: "sucessfully deleted" });
});

export default router;
