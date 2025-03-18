import express from 'express';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, getDocs, collection, query, where, } from "firebase/firestore";

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

    const docRef = doc(db, "movies", movieId);
    const docSnap = await getDoc(docRef);
        
    if (!docSnap.exists()) {
        return res.status(404).json({ error: 'Movie not found.' });
    }

    res.json(docSnap.data());
});

app.post('/movies/:id/reviews', async (req, res) => {
    const { rating, reviewText } = req.body;
    const movieId = req.params.id;

    if (!rating || !reviewText) {
        return res.status(400).json({ error: 'Rating and review text are required.' });
    }

    const newMovieReview = { 
        movieId,
        rating,
        reviewText
    };
    await setDoc(doc(db, "reviews", generateDocId()), newMovieReview);
    res.status(201).json(newMovieReview);
});

app.get('/movies/:id/reviews', async (req, res) => {
    const movieId = req.params.id;

    const getReviewsWithMovieId = query(collection(db, 'reviews'), where('movieId', '==', movieId));
    const reviews = await getDocs(getReviewsWithMovieId);

    if (reviews.empty) {
        return res.status(404).json({ error: 'No reviews found for this movie.' });
    }

    let totalRatingCount = 0;
    let reviewCount = 0;

    reviews.forEach(doc => {
        const reviewData = doc.data();
        totalRatingCount += reviewData.rating;
        reviewCount++;
    });

    const averageRating = totalRatingCount / reviewCount;

    res.json({
        movieId,
        averageRating,
    });
});

app.get('/movies/reviews/top-rated', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const reviews = await getDocs(collection(db, 'reviews'));

    if (reviews.empty) {
        return res.status(404).json({ error: 'No reviews found.' });
    }

    let movieRatings = {};

    reviews.forEach(doc => {
        const review = doc.data();
        const { movieId, rating } = review;

        if (!movieRatings[movieId]) {
            movieRatings[movieId] = { totalRatingCount: 0, reviewCount: 0 };
        }

        movieRatings[movieId].totalRatingCount += rating;
        movieRatings[movieId].reviewCount += 1;
    });

    let moviesWithAvgRating = Object.keys(movieRatings).map(movieId => {
        const { totalRatingCount, reviewCount } = movieRatings[movieId];
        return {
            movieId,
            averageRating: totalRatingCount / reviewCount,
        };
    });

    const topMovies = moviesWithAvgRating
        .sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, limit);

    res.json({ topMovies });
});

// Start the server
app.listen(port, () => {
    console.log(`Movie Review API is running on http://localhost:${port}`);
});