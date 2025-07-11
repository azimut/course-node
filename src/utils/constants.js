import "dotenv/config";

export const port = process.env.PORT || 3030;
export const secret_key = process.env.JWT_SECRET_KEY;
export const default_user = {
  id: 1,
  email: "user@email.com",
  password: "stronPass123",
};
export const apiKey = process.env.FIREBASE_API_KEY;
export const authDomain = process.env.FIREBASE_AUTH_DOMAIN;
export const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;
export const appId = process.env.FIREBASE_APP_ID;
export const projectId = process.env.FIREBASE_PROJECT_ID;
export const messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID;
export const firebaseConfig = {
  apiKey,
  authDomain,
  storageBucket,
  appId,
  projectId,
  messagingSenderId,
};
