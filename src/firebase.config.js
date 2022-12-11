import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAa5kgplHLz7tKD_2B-GQGkNJqhdYEMwHg",
    authDomain: "khkshop-1be21.firebaseapp.com",
    projectId: "khkshop-1be21",
    storageBucket: "khkshop-1be21.appspot.com",
    messagingSenderId: "893217933184",
    appId: "1:893217933184:web:07567e7fa960325458a365"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;