// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBMbCM0cYO6sKg1PXUPCm1bFL4BWN0oJgo",
  authDomain: "covid-19-765ef.firebaseapp.com",
  projectId: "covid-19-765ef",
  storageBucket: "covid-19-765ef.appspot.com",
  messagingSenderId: "53922289634",
  appId: "1:53922289634:web:eb72879e30b57ce5328bbb",
  measurementId: "G-8YNM4BCK04",
});

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
