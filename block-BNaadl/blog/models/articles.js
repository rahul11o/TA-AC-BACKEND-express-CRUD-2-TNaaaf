let mongoose = require("mongoose");

let articlesSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  author: String,
  likes: Number,
});

module.exports = mongoose.model("Article", articlesSchema);
