// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBZbKABD2eJbD17WyTXqg4fh4J42KG6fbw",
  authDomain: "backend-project-a3037.firebaseapp.com",
  projectId: "backend-project-a3037",
  storageBucket: "backend-project-a3037.firebasestorage.app",
  messagingSenderId: "290642009872",
  appId: "1:290642009872:web:b1a9f7aeb49c2bf3b90f95",
  measurementId: "G-FDVCEH0S2E"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };