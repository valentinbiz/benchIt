// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkaA0HcxiUFkiblOxf0TaYDijuWNpxroQ",
  authDomain: "benchit-db.firebaseapp.com",
  projectId: "benchit-db",
  storageBucket: "benchit-db.appspot.com",
  messagingSenderId: "836708736588",
  appId: "1:836708736588:web:88fa586efdc06363d81ee9",
  measurementId: "G-NWRVRMVX46",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
