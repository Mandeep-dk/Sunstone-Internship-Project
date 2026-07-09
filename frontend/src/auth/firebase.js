// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5ZLDC2LVaZddwBUHQSh4kEo5RU-lw7iE",
  authDomain: "second-hand-marketplace-12574.firebaseapp.com",
  projectId: "second-hand-marketplace-12574",
  storageBucket: "second-hand-marketplace-12574.firebasestorage.app",
  messagingSenderId: "155071442416",
  appId: "1:155071442416:web:205f71a777b84213848135",
  measurementId: "G-VVJGXZCBMS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);