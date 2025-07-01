const products = [
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

export function createProduct({ name, price, brand }) {
  const newProduct = { name, price, brand };
  newProduct.id = products.length + 1;
  products.push(newProduct);
  return newProduct;
}

export function deleteProduct(id) {
  products = products.filter((p) => p.id !== id);
}

export function existsProduct(id) {
  return products.findIndex((p) => p.id === id) == -1 ? false : true;
}
