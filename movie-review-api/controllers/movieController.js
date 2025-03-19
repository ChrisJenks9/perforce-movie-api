import { addMovie, getAllMovies, getMovieById } from "../models/movieModel.js";

// Controller to create and add movie to firestore DB
export const createMovie = async (req, res) => {
    const { title, genre, year } = req.body;
    if (!title || !genre || !year) {
        return res.status(400).json({ error: "Movie title, genre, and year are required." });
    }
    
    const movie = await addMovie({ title, genre, year });
    res.status(201).json(movie);
};

// Controller to fetch all movies from firestore DB
export const fetchMovies = async (req, res) => {
    const movies = await getAllMovies();
    res.json(movies);
};

// Controller to fetch a single movie by ID from firestore DB
export const fetchMovieById = async (req, res) => {
    const movie = await getMovieById(req.params.id);
    if (!movie) {
        return res.status(404).json({ error: "Movie not found." });
    }
    res.json(movie);
};