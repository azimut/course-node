import status from "http-status";

export function deleteProduct(_req, res) {
  res.status(status.NO_CONTENT).send();
}

export function addNewProduct(req, res) {
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

export function getProduct(_req, res) {
  const product = {};
  if (product) {
    res.json(product);
  } else {
    res.status(status.NOT_FOUND).json({ error: "product not found" });
  }
}

export function getProducts(_req, res) {
  const products = [];
  res.json(products);
}
