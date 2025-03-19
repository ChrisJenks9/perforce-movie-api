import app from "./src/app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Movie Review API is running on http://localhost:${PORT}`);
});