import { db } from "../config/firebase.js";
import { doc, setDoc, getDocs, collection, getDoc } from "firebase/firestore";
import generateDocId from "../utils/generateDocId.js";

export const addMovie = async (movieData) => {
    const movieId = generateDocId();
    await setDoc(doc(db, "movies", movieId), movieData);
    return { id: movieId, ...movieData };
};

export const getAllMovies = async () => {
    const movies = await getDocs(collection(db, "movies"));
    return movies.docs.map(movie => ({ id: movie.id, ...movie.data() }));
};

export const getMovieById = async (movieId) => {
    const movieRef = doc(db, "movies", movieId);
    const movie = await getDoc(movieRef);
    return movie.exists() ? { id: movie.id, ...movie.data() } : null;
};