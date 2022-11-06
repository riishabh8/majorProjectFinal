const mongoose = require("mongoose");
const { Schema } = mongoose;

const movie = new Schema({
  rating: String,
  review: String,
  movieId: Number,
  user: String,
});

module.exports = mongoose.model("movies", movie);
