// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOjE_rbvxW4NTiCj4Qc3etwrCEfusOHBM",
  authDomain: "fryer-counter.firebaseapp.com",
  projectId: "fryer-counter",
  storageBucket: "fryer-counter.appspot.com",
  messagingSenderId: "867746060552",
  appId: "1:867746060552:web:c262504a9d945b932034bd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
