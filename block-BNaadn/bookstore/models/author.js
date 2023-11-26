let mongoose = require("mongoose");
let Book = require("../models/book");

let authorSchema = new mongoose.Schema({
  name: String,
  email: String,
  country: String,
  bookId: { type: mongoose.Types.ObjectId, ref: "Book" },
});

module.exports = mongoose.model("Author", authorSchema);
