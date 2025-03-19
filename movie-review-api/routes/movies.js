import express from "express";
import { createMovie, fetchMovies, fetchMovieById } from "../controllers/movieController.js";

const router = express.Router();

// Create API routes for movies
router.post("/", createMovie);
router.get("/", fetchMovies);
router.get("/:id", fetchMovieById);

export default router;