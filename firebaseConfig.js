// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAm1e9MHMLtW85XOf40zfY9StVimBjKOz4",
  authDomain: "benchit-4a8d3.firebaseapp.com",
  projectId: "benchit-4a8d3",
  storageBucket: "benchit-4a8d3.appspot.com",
  messagingSenderId: "492474050700",
  appId: "1:492474050700:web:6b517c6dea248f036773a9",
  measurementId: "G-9LMPRJ08RT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);