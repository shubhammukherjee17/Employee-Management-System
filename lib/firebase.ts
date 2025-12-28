import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDKqfTvoC45axxB91d35VV_hrP1rC7cNW4",
    authDomain: "employee-management-ems.firebaseapp.com",
    projectId: "employee-management-ems",
    storageBucket: "employee-management-ems.firebasestorage.app",
    messagingSenderId: "1020974823194",
    appId: "1:1020974823194:web:69ddd06705315604e6dea3",
    measurementId: "G-S76YNY4W9D"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };