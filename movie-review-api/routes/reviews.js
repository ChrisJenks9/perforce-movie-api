import express from "express";
import { createReview, fetchReviewsByMovie, fetchTopRatedMovies } from "../controllers/reviewController.js";

const router = express.Router();

// Create API routes for reviews
router.post("/:id", createReview);
router.get("/top-rated", fetchTopRatedMovies);
router.get("/:id", fetchReviewsByMovie);

export default router;