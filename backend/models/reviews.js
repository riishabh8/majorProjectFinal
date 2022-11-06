const mongoose = require("mongoose");
const { Schema } = mongoose;

const review = new Schema({
  rating: String,
  review: String,
  movieId: Number,
  user: String,
});

module.exports = mongoose.model("reviewSchema", review);
