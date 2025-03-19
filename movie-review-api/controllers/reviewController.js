import { addReview, getReviewsByMovieId, getAllReviews } from "../models/reviewModel.js";

// Controller to add a movie review, attached with the movies ID to the firestore DB
export const createReview = async (req, res) => {
    const { rating, reviewText } = req.body;
    if (!rating || !reviewText) {
        return res.status(400).json({ error: "Rating and review text are required." });
    }
    
    const review = await addReview({ movieId: req.params.id, rating, reviewText });
    res.status(201).json(review);
};

// Controller to fetch movie reviews by movie ID and calculate the average rating
export const fetchReviewsByMovie = async (req, res) => {
    const reviews = await getReviewsByMovieId(req.params.id);
    if (reviews.length === 0) {
        return res.status(404).json({ error: "No reviews found for this movie." });
    }

    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    res.json({ movieId: req.params.id, averageRating, reviews });
};

// Controller to fetch the top rated movies based on the query string parameter limit
export const fetchTopRatedMovies = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const reviews = await getAllReviews();

    if (reviews.empty) {
        return res.status(404).json({ error: 'No reviews found.' });
    }

    let movieRatings = {};

    reviews.forEach(review => {
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
};