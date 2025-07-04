import status from "http-status";
import { validationResult } from "express-validator";
import * as service from "../services/products.js";
import * as model from "../models/products.js";

export async function getProducts(_req, res) {
  const products = await model.getAllProducts();
  res.json(products);
}

export async function getProduct(req, res) {
  const product = await model.getProduct(req.params.id);
  if (product) res.json(product);
  else res.status(status.NOT_FOUND).json({});
}

export async function searchProduct(req, res) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const results = await service.searchProduct(req.query);
    res.json(results);
  } else res.status(status.BAD_REQUEST).json({ errors: result.array() });
}

export async function deleteProduct(req, res) {
  await model.deleteProduct(req.params.id);
  res.status(status.NO_CONTENT).send();
}

export async function createProduct(req, res) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    await model.addNewProduct(req.body);
    const products = await model.getAllProducts();
    res.status(status.CREATED).json(products);
  } else res.status(status.BAD_REQUEST).json({ errors: result.array() });
}

export async function updateProduct(req, res) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const existed = await service.existsProduct(req.params.id);
    await model.addProduct({ id: req.params.id, ...req.body });
    res.status(existed ? status.NO_CONTENT : status.CREATED).send();
  } else res.status(status.BAD_REQUEST).json({ errors: result.array() });
}

export async function patchProduct(req, res) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const exists = await service.existsProduct(req.params.id);
    if (exists) {
      await service.patchProduct({ id: req.params.id, ...req.body });
      res.status(status.NO_CONTENT).send();
    } else res.status(status.NOT_FOUND).send();
  } else res.status(status.BAD_REQUEST).json({ errors: result.array() });
}
