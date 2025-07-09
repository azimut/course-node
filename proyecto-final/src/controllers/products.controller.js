import http from "http-status";
import * as model from "../models/products.js";

export async function getProducts(_req, res) {
  const products = await model.getProducts();
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
  const search = await model.searchProduct(req.query);
  res.json(search);
}

export async function deleteProduct(req, res) {
  await model.deleteProduct(req.params.id);
  res.status(http.NO_CONTENT).send();
}

export async function postProduct(req, res) {
  const product = await model.addNewProduct(req.body);
  res.status(http.CREATED).json(product);
}

export async function putProduct(req, res) {
  const product = await model.getProduct(req.params.id);
  await model.setProduct({ id: req.params.id, ...product, ...req.body });
  res.status(product ? http.NO_CONTENT : http.CREATED).send();
}

export async function patchProduct(req, res) {
  const product = await model.getProduct(req.params.id);
  if (product) {
    await model.setProduct({ ...product, ...req.body });
    res.status(http.NO_CONTENT).send();
  } else {
    res.status(http.NOT_FOUND).json({});
  }
}
