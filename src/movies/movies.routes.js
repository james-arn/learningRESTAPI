const { Router } = require("express");
const {
  addMovie,
  getMovies,
  deleteMovie,
  updateRating,
} = require("./movies.controllers");
const movieRouter = Router();

movieRouter.post("/movie", addMovie);
movieRouter.get("/movie", getMovies);
movieRouter.put("/movie", updateRating);
movieRouter.delete("/movie/:MovieTitle", deleteMovie);

module.exports = movieRouter;
