import * as model from "../models/products.js";

export async function searchProduct({ name, brand, minPrice, maxPrice }) {
  let result = await model.getProducts();
  if (name) result = result.filter((p) => p.name.includes(name));
  if (brand) result = result.filter((p) => p.brand.includes(brand));
  if (minPrice) result = result.filter((p) => p.price > minPrice);
  if (maxPrice) result = result.filter((p) => p.price < maxPrice);
  return result;
}
