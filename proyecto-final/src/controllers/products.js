import http from "http-status";
import { validationResult } from "express-validator";
import * as service from "../services/products.js";
import * as model from "../models/products.js";

export async function getProducts(_req, res) {
  const products = await model.getAllProducts();
  res.json(products);
}

export async function getProduct(req, res) {
  const product = await model.getProduct(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(http.NOT_FOUND).json({});
  }
}

export async function searchProduct(req, res) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const search = await service.searchProduct(req.query);
    res.json(search);
  } else {
    res.status(http.BAD_REQUEST).json({ errors: result.array() });
  }
}

export async function deleteProduct(req, res) {
  await model.deleteProduct(req.params.id);
  res.status(http.NO_CONTENT).send();
}

export async function createProduct(req, res) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    await model.addNewProduct(req.body);
    const products = await model.getAllProducts();
    res.status(http.CREATED).json(products);
  } else res.status(http.BAD_REQUEST).json({ errors: result.array() });
}

export async function updateProduct(req, res) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const existed = await service.existsProduct(req.params.id);
    await model.addProduct({ id: req.params.id, ...req.body });
    res.status(existed ? http.NO_CONTENT : http.CREATED).send();
  } else res.status(http.BAD_REQUEST).json({ errors: result.array() });
}

export async function patchProduct(req, res) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const exists = await service.existsProduct(req.params.id);
    if (exists) {
      await service.patchProduct({ id: req.params.id, ...req.body });
      res.status(http.NO_CONTENT).send();
    } else res.status(http.NOT_FOUND).send();
  } else res.status(http.BAD_REQUEST).json({ errors: result.array() });
}
