import status from "http-status";
import * as service from "../services/products.js";

export function getProducts(_req, res) {
  res.json(service.getProducts());
}

export function getProduct(req, res) {
  const product = service.getProduct(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(status.NOT_FOUND).json({ error: "product not found" });
  }
}

export function deleteProduct(req, res) {
  service.deleteProduct(req.params.id);
  res.status(status.NO_CONTENT).send();
}

export function createProduct(req, res) {
  const { name, price, brand } = req.body;
  if (name && price && brand) {
    service.createProduct(name, price, brand);
    res.status(status.CREATED).json(products);
  } else {
    res.status(status.BAD_REQUEST).json({ error: "not enough fields" });
  }
}

export function updateProduct(_req, res) {
  const exists = true;
  if (exists) {
    res.status(status.NO_CONTENT).send();
  } else {
    res.status(status.CREATED);
  }
}

export function patchProduct(_req, res) {
  res.status(status.NO_CONTENT).send();
}

export function searchProduct(_req, res) {
  res.json({});
}
