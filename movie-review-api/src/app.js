import express from "express";
import movieRoutes from "../routes/movies.js";
import reviewRoutes from "../routes/reviews.js";

const app = express();
app.use(express.json());

app.use("/movies", movieRoutes);
app.use("/reviews", reviewRoutes);

export default app;