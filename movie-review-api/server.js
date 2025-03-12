import express from 'express';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const app = express();
const port = 3000;

app.use(express.json());

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAx0dp0fqOY2mvMdwR2hLGtxQVpN96K2Ic",
    authDomain: "movies-api-2d713.firebaseapp.com",
    projectId: "movies-api-2d713",
    storageBucket: "movies-api-2d713.firebasestorage.app",
    messagingSenderId: "600978394026",
    appId: "1:600978394026:web:74deeabe85ee507ca3f9d3"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const generateDocId = () => {
    return new Date().getTime().toString();                             
}

// 1. Add a new movie
app.post('/movies', async (req, res) => {
    const { title, genre, year } = req.body;
    if (!title || !genre || !year ) {
        return res.status(400).json({ error: 'Movie title, year and description are required.' });
    }

    const newMovie = { title, genre, year };
    await setDoc(doc(db, "movies", generateDocId()), newMovie);
    res.status(201).json(newMovie);
});

// Start the server
app.listen(port, () => {
    console.log(`Movie Review API is running on http://localhost:${port}`);
});