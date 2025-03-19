import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    // Should move these to a .env file outside of this tech challenge
    apiKey: "AIzaSyAx0dp0fqOY2mvMdwR2hLGtxQVpN96K2Ic",
    authDomain: "movies-api-2d713.firebaseapp.com",
    projectId: "movies-api-2d713",
    storageBucket: "movies-api-2d713.firebasestorage.app",
    messagingSenderId: "600978394026",
    appId: "1:600978394026:web:74deeabe85ee507ca3f9d3"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };