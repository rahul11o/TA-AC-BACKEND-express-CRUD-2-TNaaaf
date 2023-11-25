var mongoose = require("mongoose");

var articlesSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  author: String,
  likes: { type: Number, Default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Article", articlesSchema);
