let mongoose = require("mongoose");
const { schema } = require("./article");

let commentsSchema = new mongoose.Schema({
  content: String,
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
    required: true,
  },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Comment", commentsSchema);
