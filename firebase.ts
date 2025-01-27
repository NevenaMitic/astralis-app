import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBYe2-puqoXErm8EQvT6P5WCZoDXZPaBNU",
    authDomain: "astralis-app.firebaseapp.com",
    projectId: "astralis-app",
    storageBucket: "astralis-app.firebasestorage.app",
    messagingSenderId: "1044086805839",
    appId: "1:1044086805839:web:d3cd56de384402ba1ae13a"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };