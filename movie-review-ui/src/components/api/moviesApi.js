import axios from 'axios';

const API_URL = 'http://localhost:3000/movies';

export const fetchMovies = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const fetchMovieById = async (movieId) => {
    const response = await axios.get(`${API_URL}/${movieId}`);
    return response.data;
};

export const fetchTopRatedMovies = async () => {
    const response = await axios.get(`${API_URL}/top-rated`);
    return response.data;
}

export const fetchAverageRating = async (movieId) => {
    const response = await axios.get(`${API_URL}/${movieId}/reviews`);
    return response.data;
}

export const submitReview = async (movieId, reviewData) => {
    const response = await axios.post(`${API_URL}/${movieId}/reviews`, reviewData);
    return response.data;
};

export const addMovie = async (movieData) => {
    const response = await axios.post(API_URL, movieData);
    return response.data;
};