import { Router } from "express";
import status from "http-status";

const router = Router();

router.get("/", (_req, res) => {
  const products = [];
  res.json(products);
});
router.put("/:id", (req, res) => res.json({ message: "updated" }));
router.patch("/:id", (req, res) => res.json({ message: "updated" }));
router.get("/:id", (req, res) => {
  const product = {};
  if (product) {
    res.json(product);
  } else {
    res.status(status.NOT_FOUND).json({ error: "product not found" });
  }
});
router.post("/", (req, res) => {
  try {
    const { name, price } = req.params;
    const id = 999;
    res.status(status.CREATED).json({ id });
  } catch (err) {
    res.status(status.NOT_FOUND).json({ error: "not enough params" });
  }
});
router.delete("/:id", (req, res) => {
  res.status(status.ACCEPTED).json({ message: "sucessfully deleted" });
});

export default router;
