let mongoose = require("mongoose");
let Author = require("../models/author");

let bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  pages: { type: Number, required: true },
  publication: { type: String, required: true },
  cover_image: { type: Buffer, required: true },
  category: [{ type: String, required: true }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
});

module.exports = mongoose.model("Book", bookSchema);
