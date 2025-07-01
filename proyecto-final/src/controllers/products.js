import status from "http-status";
import { validationResult } from "express-validator";
import * as service from "../services/products.js";

export function getProducts(_req, res) {
  res.json(service.getProducts());
}

export function getProduct(req, res) {
  const product = service.getProduct(req.params.id);
  if (product) res.json(product);
  else res.status(status.NOT_FOUND).json({});
}

export function deleteProduct(req, res) {
  service.deleteProduct(req.params.id);
  res.status(status.NO_CONTENT).send();
}

export function createProduct(req, res) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    service.createProduct(req.body);
    res.status(status.CREATED).json(service.getProducts());
  } else {
    res.status(status.BAD_REQUEST).json({ errors: result.array() });
  }
}

export function updateProduct(req, res) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const existed = service.existsProduct(req.params.id);
    service.createProduct({ id: req.params.id, ...req.body });
    res.status(existed ? status.NO_CONTENT : status.CREATED).send();
  } else {
    res.status(status.BAD_REQUEST).json({ errors: result.array() });
  }
}

export function patchProduct(req, res) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    if (service.existsProduct(req.params.id)) {
      service.patchProduct({ id: req.params.id, ...req.body });
      res.status(status.NO_CONTENT).send();
    } else res.status(status.NOT_FOUND).send();
  } else res.status(status.BAD_REQUEST).json({ errors: result.array() });
}

export function searchProduct(_req, res) {
  res.json({});
}
