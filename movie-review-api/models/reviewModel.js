import { db } from "../config/firebase.js";
import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
import generateDocId from "../utils/generateDocId.js";

export const addReview = async (reviewData) => {
    const reviewId = generateDocId();
    await setDoc(doc(db, "reviews", reviewId), reviewData);
    return { id: reviewId, ...reviewData };
};

export const getReviewsByMovieId = async (movieId) => {
    const q = query(collection(db, "reviews"), where("movieId", "==", movieId));
    const reviews = await getDocs(q);
    return reviews.docs.map(review => ({ id: review.id, ...review.data() }));
};

export const getAllReviews = async () => {
    const reviews = await getDocs(collection(db, 'reviews'));
    return reviews.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
