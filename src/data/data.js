import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  appId,
  apiKey,
  authDomain,
  storageBucket,
} from "../utils/constants.js";

const app = initializeApp({
  apiKey,
  appId,
  authDomain,
  storageBucket,
  projectId: "curso-node-final",
  messagingSenderId: "1075591860909",
});
const db = getFirestore(app);

export { db };
