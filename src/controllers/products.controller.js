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
    res.status(404).json({});
  }
}

export async function searchProduct(req, res) {
  const { name, category, minPrice, maxPrice } = req.query;
  const search = await model.searchProduct({
    name,
    category,
    minPrice,
    maxPrice,
  });
  res.json(search);
}

export async function deleteProduct(req, res) {
  await model.deleteProduct(req.params.id);
  res.status(204).send();
}

export async function deleteProducts(_req, res) {
  await model.deleteProducts();
  res.status(204).send();
}

export async function postProduct(req, res) {
  // #swagger.parameters['body'] = {  in: 'body', schema: { $ref: '#/definitions/AddProduct' } }
  const product = await model.addNewProduct(...req.body);
  res.status(201).json(product);
}

export async function putProduct(req, res) {
  const product = await model.getProduct(req.params.id);
  await model.setProduct({ id: req.params.id, ...product, ...req.body });
  res.status(product ? 204 : 201).send();
}

export async function patchProduct(req, res) {
  const product = await model.getProduct(req.params.id);
  if (product) {
    await model.setProduct({ ...product, ...req.body });
    res.status(204).send();
  } else {
    res.status(404).json({});
  }
}
