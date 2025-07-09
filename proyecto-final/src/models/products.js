import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../data/data.js";

const productsCollection = collection(db, "products");

export async function getProducts() {
  const snapshot = await getDocs(productsCollection);
  const products = [];
  snapshot.forEach((doc) => products.push({ id: doc.id, ...doc.data() }));
  return products;
}

export async function getProduct(id) {
  const productDoc = await getDoc(doc(productsCollection, id));
  if (productDoc.exists()) return { id, ...productDoc.data() };
}

export async function deleteProduct(id) {
  await deleteDoc(doc(productsCollection, id));
}

export async function setProduct(product) {
  const { id, name, price, categories } = product;
  await setDoc(doc(productsCollection, id), { name, price, categories });
  return product;
}

export async function addNewProduct(product) {
  const createdProduct = await addDoc(productsCollection, product);
  product.id = createdProduct.id;
  return product;
}

export async function searchProduct({ name, category, minPrice, maxPrice }) {
  let result = await getProducts();
  if (name) result = result.filter((p) => p.name.includes(name));
  if (category) result = result.filter((p) => p.categories.includes(category));
  if (minPrice) result = result.filter((p) => p.price > minPrice);
  if (maxPrice) result = result.filter((p) => p.price < maxPrice);
  return result;
}
