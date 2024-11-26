// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVqR9oD3bFKkgwOWIc_3dmAS6vr1qv-jY",
  authDomain: "auth-medic.firebaseapp.com",
  projectId: "auth-medic",
  storageBucket: "auth-medic.firebasestorage.app",
  messagingSenderId: "194297913128",
  appId: "1:194297913128:web:ad0560c132a28f7427fa1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);