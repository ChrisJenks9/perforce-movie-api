import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { addMovie } from "../components/api/moviesApi";

const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !rating || !year) return;
    addMovie({ title, rating, year });
    setTitle("");
    setRating("");
    setYear("");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add a New Movie
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Rating"
          type="number"
          variant="outlined"
          fullWidth
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
        <TextField
          label="Year"
          type="number"
          variant="outlined"
          fullWidth
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Movie
        </Button>
      </Box>
    </Container>
  );
};

export default AddMovie;