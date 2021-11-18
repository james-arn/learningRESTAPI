const Movie = require("./movies.model");

//CREATE
exports.addMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.status(200).send({ message: "success", newMovie });
  } catch (error) {
    console.log(error);
    res
      .status(418)
      .send({ message: "Adding user went wrong. Check server logs." });
  }
};

//READ
exports.getMovies = async (req, res) => {
  try {
    const movieList = await Movie.find({});
    console.log("Successfully read database.");
    res.status(200).send({ movieList });
  } catch (error) {
    console.log(error);
    res
      .status(418)
      .send({ message: "Reading the database went wrong. Check server logs." });
  }
};

//UPDATE
exports.updateRating = async (req, res) => {
  try {
    console.log("hello");
    await Movie.findOneAndUpdate(
      { MovieTitle: req.body.MovieTitle },
      { rating: req.body.rating }
    );
    console.log("Username updated.");
    res.status(200).send({ message: "Success" });
  } catch (error) {
    console.log(error);
    res
      .status(418)
      .send({ message: "Reading database error. Check server logs" });
  }
};

//DELETE
exports.deleteMovie = async (req, res) => {
  try {
    await Movie.findOneAndDelete({ MovieTitle: req.params.MovieTitle });
    res.status(200).send({ message: "success, user deleted." });
  } catch (error) {
    res.status(500).send({ message: "check server logs" });
  }
};
