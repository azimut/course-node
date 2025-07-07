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
  return fs
    .readFile(productsFilename, { encoding: "utf8" })
    .then((json) => JSON.parse(json));
}

export async function getProduct(id) {
  return getAllProducts().then((ps) => ps.find((p) => p.id === id));
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
  return product;
}

export async function addNewProduct(product) {
  const products = await getAllProducts();
  const id = products.length + 1;
  await addProduct({ id, ...product });
}
