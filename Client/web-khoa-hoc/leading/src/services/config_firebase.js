// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAyW-x6RDDi6FB3s6kvG9RgtvUhiodnY_U",
  authDomain: "luutru-web-ban-khoa-hoc-cef36.firebaseapp.com",
  projectId: "luutru-web-ban-khoa-hoc-cef36",
  storageBucket: "luutru-web-ban-khoa-hoc-cef36.appspot.com",
  messagingSenderId: "557301200635",
  appId: "1:557301200635:web:787509f5036107b3f0a25e",
  measurementId: "G-ZXG0ZTMNV1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const providerGG = new GoogleAuthProvider();
export { auth, providerGG, storage };
