let products = [
  {
    id: 1,
    name: "8048",
    brand: "Intel",
    price: 133.1,
  },
  {
    id: 2,
    name: "Z80",
    brand: "Zilog",
    price: 80.0,
  },
  {
    id: 555,
    name: "555",
    brand: "Signetics",
    price: 5.55,
  },
];

export function getProducts() {
  return products;
}

export function getProduct(id) {
  return products.find((p) => p.id === id);
}

export function createProduct(newProduct) {
  newProduct.id = newProduct.id || products.length + 1;
  deleteProduct(newProduct.id);
  products.push(newProduct);
  return newProduct;
}

export function patchProduct(newProduct) {
  const product = getProduct(newProduct.id); // assume it exists
  const {
    id,
    name = product.name,
    brand = product.brand,
    price = product.price,
  } = newProduct;
  createProduct({ id, name, brand, price });
}

export function deleteProduct(id) {
  products = products.filter((p) => p.id !== id);
}

export function existsProduct(id) {
  return products.findIndex((p) => p.id === id) == -1 ? false : true;
}
