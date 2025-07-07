import path from "node:path";
import fs from "node:fs/promises";

const productsFilename = path.join(
  import.meta.dirname,
  "..",
  "..",
  "data",
  "products.json"
);

export async function getProducts() {
  return fs.readFile(productsFilename, { encoding: "utf8" }).then(JSON.parse);
}

export async function getProduct(id) {
  return getProducts().then((ps) => ps.find((p) => p.id === id));
}

export async function deleteProduct(id) {
  const products = await getProducts();
  const filtered = products.filter((p) => p.id !== id);
  await setProducts(filtered);
}

export async function setProduct(product) {
  await deleteProduct(product.id);
  const products = await getProducts();
  products.push(product);
  await setProducts(products);
  return product;
}

export async function addNewProduct(product) {
  return getProducts().then((products) => {
    setProduct({ id: products.length + 1, ...product });
  });
}

async function setProducts(products) {
  await fs.writeFile(productsFilename, JSON.stringify(products));
}
