import * as model from "../models/products.js";

export async function patchProduct(newProduct) {
  const product = await model.getProduct(newProduct.id); // assume it exists
  const {
    id,
    name = product.name,
    brand = product.brand,
    price = product.price,
  } = newProduct;
  await model.addProduct({ id, name, brand, price });
}

export async function existsProduct(id) {
  return model
    .getAllProducts()
    .then((ps) => ps.findIndex((p) => p.id === id) !== -1);
}

export async function searchProduct({ name, brand, minPrice, maxPrice }) {
  let result = await model.getAllProducts();
  if (name) result = result.filter((p) => p.name.includes(name));
  if (brand) result = result.filter((p) => p.brand.includes(brand));
  if (minPrice) result = result.filter((p) => p.price > minPrice);
  if (maxPrice) result = result.filter((p) => p.price < maxPrice);
  return result;
}
