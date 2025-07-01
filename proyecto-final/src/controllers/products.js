import status from "http-status";
import { validationResult } from "express-validator";
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
  if (validationResult(req).isEmpty()) {
    service.createProduct(req.body);
    res.status(status.CREATED).json(service.getProducts());
  } else {
    res.status(status.BAD_REQUEST).json({ error: "not enough fields" });
  }
}

export function updateProduct(req, res) {
  if (validationResult(req).isEmpty()) {
    const existed = service.existsProduct(req.params.id);
    // const { name, brand, price } = req.body;
    // TODO: call to updateProduct(id, name, brand, price)
    res.status(existed ? status.NO_CONTENT : status.CREATED).send();
  } else {
    res.status(status.BAD_REQUEST).json({ error: "not enough fields" });
  }
}

export function patchProduct(req, res) {
  const { name, brand, price } = req.body;
  if (name || brand || price) {
    if (service.existsProduct(req.params.id)) {
      res.status(status.NO_CONTENT).send();
    } else {
      res.status(status.NOT_FOUND).send();
    }
  } else {
    res.status(status.UNPROCESSABLE_ENTITY).send();
  }
}

export function searchProduct(_req, res) {
  res.json({});
}
