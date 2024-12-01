// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBMtY5sQGyw-XHy8OaNiXp9Z233CdPPPHA",
  authDomain: "socialmediaauth-82e16.firebaseapp.com",
  projectId: "socialmediaauth-82e16",
  storageBucket: "socialmediaauth-82e16.firebasestorage.app",
  messagingSenderId: "722022777314",
  appId: "1:722022777314:web:c2a552601ab5704aefb9bb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);