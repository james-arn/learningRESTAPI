const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  MovieId: {
    type: Number,
    required: true,
    unique: true,
  },
  MovieTitle: {
    type: String,
    required: true,
    unqiue: true,
  },
  rating: {
    type: Number,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
