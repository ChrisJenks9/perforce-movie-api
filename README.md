
# Movie Review API

This is a simple Movie Review API built using Express and Firebase Firestore. It allows you to add and retrieve movies, as well as post and fetch reviews with ratings for each movie.

## Built With

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)

## Setup

Before running the API, make sure you have Firebase Firestore already set up with your project. Since the Firebase DB is already set up, you can skip the Firebase initialization part and just install dependencies.

### 1. Clone this repository

```bash
git clone https://github.com/ChrisJenks9/perforce-movie-api.git
cd movie-review-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the server

```bash
npm start
```

This will start the API server on port 3000. You can access the API at `http://localhost:3000`.

## API Endpoints

### 1. Add a new movie

**POST** `/movies`

**Request body:**

```json
{
    "title": "Movie Title",
    "genre": "Movie Genre",
    "year": 2025
}
```

**Response:**

- Status: `201 Created`
- Response body: 

```json
{
    "title": "Movie Title",
    "genre": "Movie Genre",
    "year": 2025
}
```

### 2. Retrieve a movie by ID

**GET** `/movies/:id`

**Response:**

- Status: `200 OK`
- Response body: 

```json
{
    "title": "Movie Title",
    "genre": "Movie Genre",
    "year": 2025
}
```

- Status: `404 Not Found` if the movie is not found.

### 3. Add a review for a movie

**POST** `/movies/:id/reviews`

**Request body:**

```json
{
    "rating": 5,
    "reviewText": "Great movie!"
}
```

**Response:**

- Status: `201 Created`
- Response body:

```json
{
    "movieId": "movieIdHere",
    "rating": 5,
    "reviewText": "Great movie!"
}
```

### 4. Retrieve all reviews for a movie and calculate average rating

**GET** `/movies/:id/reviews`

**Response:**

- Status: `200 OK`
- Response body:

```json
{
    "movieId": "movieIdHere",
    "averageRating": 4.5
}
```

- Status: `404 Not Found` if no reviews are found for the movie.

### 5. Get top-rated movies based on reviews

**GET** `/movies/reviews/top-rated`

**Query parameters:**

- `limit`: (optional) Limit the number of top-rated movies returned. Default is 10.

**Response:**

- Status: `200 OK`
- Response body:

```json
{
    "topMovies": [
        {
            "movieId": "movieId1",
            "averageRating": 4.8
        },
        {
            "movieId": "movieId2",
            "averageRating": 4.7
        }
    ]
}
```

## Notes

- Make sure to replace Firebase configuration with your own if necessary. This setup assumes Firebase Firestore is already initialized.
- The Firestore collections used in this project are:
  - `movies` (stores movie details)
  - `reviews` (stores movie reviews)

## Author

Chris Jenks
