import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDuLOXsaF5aVfXTDLIHk_L76IYawmdXxis",
  authDomain: "nexmart-cd0bb.firebaseapp.com",
  projectId: "nexmart-cd0bb",
  storageBucket: "nexmart-cd0bb.firebasestorage.app",
  messagingSenderId: "1056747829147",
  appId: "1:1056747829147:web:ad6cf6b0453bf78cbf533e",
  measurementId: "G-JM4NN4MZ50",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);


export { db };