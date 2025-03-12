import express from 'express';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

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

// Generates unique Doc ID for Firebase
const generateDocId = () => {
    return new Date().getTime().toString();                             
}

// Add new movie
app.post('/movies', async (req, res) => {
    const { title, genre, year } = req.body;
    if (!title || !genre || !year ) {
        return res.status(400).json({ error: 'Movie title, year and description are required.' });
    }

    const newMovie = { title, genre, year };
    await setDoc(doc(db, "movies", generateDocId()), newMovie);
    res.status(201).json(newMovie);
});

// Retrieve a Movie
app.get('/movies/:id', async (req, res) => {
    const movieId = req.params.id;

    try {
        const docRef = doc(db, "movies", movieId);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
            return res.status(404).json({ error: 'Movie not found.' });
        }

        res.json(docSnap.data());
    } catch (error) {
        res.status(500).json({ error: 'Error fetching movie from Firebase Firestore', details: error });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Movie Review API is running on http://localhost:${port}`);
});