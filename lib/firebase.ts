import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZlbsFj6JVEkA0IBtvS4IdHFpMmdjB4nY",
  authDomain: "undangan-a5da5.firebaseapp.com",
  projectId: "undangan-a5da5",
  storageBucket: "undangan-a5da5.firebasestorage.app",
  messagingSenderId: "373163151418",
  appId: "1:373163151418:web:31309ba0384932bd422503",
  measurementId: "G-SE86J1NG1C",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
