import path from "node:path";
import fs from "node:fs/promises";

const productsFilename = path.join(
  import.meta.dirname,
  "..",
  "..",
  "data",
  "products.json"
);

export async function getAllProducts() {
  const productsRaw = await fs.readFile(productsFilename, { encoding: "utf8" });
  const products = JSON.parse(productsRaw);
  return products;
}

export async function getProduct(id) {
  const products = await getAllProducts();
  return products.find((p) => p.id === id);
}

export async function deleteProduct(id) {
  const products = await getAllProducts();
  const filtered = products.filter((p) => p.id !== id);
  await updateProducts(filtered);
}

export async function updateProducts(products) {
  const newProducts = JSON.stringify(products);
  await fs.writeFile(productsFilename, newProducts);
}

export async function addProduct(product) {
  await deleteProduct(product.id);
  const products = await getAllProducts();
  products.push(product);
  await updateProducts(products);
}
