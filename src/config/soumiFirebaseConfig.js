

// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration (copy from Firebase console)
const firebaseConfig = {
    apiKey: "AIzaSyB375WJDuRLAqWzrla94FCxM55EC66Ll4g",
    authDomain: "dental-525d5.firebaseapp.com",
    projectId: "dental-525d5",
    storageBucket: "dental-525d5.appspot.com",
    messagingSenderId: "237716703119",
    appId: "1:237716703119:web:5d23d11592f795847d6dfa",
    measurementId: "G-KZ8097HCXN"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);
