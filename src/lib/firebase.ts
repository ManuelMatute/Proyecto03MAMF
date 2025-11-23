// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbywVF4lDKIWLvmU9LHI98uK0gS9XW7EE",
  authDomain: "libros-14e78.firebaseapp.com",
  projectId: "libros-14e78",
  storageBucket: "libros-14e78.firebasestorage.app",
  messagingSenderId: "819486237786",
  appId: "1:819486237786:web:d680e4a47014c726386463",
  measurementId: "G-6K24RNWLJ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);