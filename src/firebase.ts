import { initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

// Public web config only. Restrict with Firestore rules, never with secrecy.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "REPLACE_ME",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "REPLACE_ME.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "REPLACE_ME",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "REPLACE_ME.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "0",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "REPLACE_ME",
};

let app: FirebaseApp | undefined;
let db: Firestore | undefined;

export function isFirebaseConfigured(): boolean {
  return (
    !!import.meta.env.VITE_FIREBASE_API_KEY &&
    !!import.meta.env.VITE_FIREBASE_PROJECT_ID &&
    import.meta.env.VITE_FIREBASE_API_KEY !== "REPLACE_ME"
  );
}

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  return app;
}

export function getDb(): Firestore {
  if (!db) {
    db = getFirestore(getFirebaseApp());
  }
  return db;
}

export const PORTFOLIO_COLLECTION = "portfolio";
export const PORTFOLIO_DOC_ID = "published";
