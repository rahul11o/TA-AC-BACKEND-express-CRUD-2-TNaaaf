let express = require("express");
let router = express.Router();
let Book = require("../models/book");
let Author = require("../models/author");

router.get("/", async (req, res, next) => {
  let book = await Book.find().populate("author");
  res.render("books.ejs", { book });
});

router.get("/new", (req, res, next) => {
  try {
    res.render("bookForm.ejs");
  } catch (error) {
    next(error);
  }
});
// save and display the book details
router.post("/", async (req, res, next) => {
  try {
    let author = await Author.create({
      name: req.body.name,
      email: req.body.email,
      country: req.body.country,
    });
    let book = await Book.create({
      title: req.body.title.toLowerCase(),
      summary: req.body.summary,
      pages: req.body.pages,
      publication: req.body.title,
      category: req.body.category,

      cover_image: req.body.cover_image,
      author: author._id,
    });
    await Author.findByIdAndUpdate(author._id, { bookId: book._id });
    res.redirect("/books");
  } catch (error) {
    next(error);
  }
});

router.post("/bookname", async (req, res, next) => {
  try {
    let booknamelc = req.body.bookname.toLowerCase();
    console.log(booknamelc);
    let book = await Book.find({ title: booknamelc }).populate("author");
    console.log(book);
    res.render("books.ejs", { book });
  } catch (error) {
    next(error);
  }
});
router.post("/authorname", async (req, res, next) => {
  try {
    let authornamelc = req.body.authorname.toLowerCase;
    console.log(authornamelc);
    let author = await Author.findOne({ name: authornamelc });
    console.log(author.bookId);
    let book = await Book.find({ _id: author.bookId }).populate("author");
    console.log(book);
    res.render("books.ejs", { book });
  } catch (error) {
    next(error);
  }
});

router.post("/category", async (req, res, next) => {
  try {
    console.log(req.body);
    let book = await Book.find({ category: req.body.category }).populate(
      "author"
    );
    // console.log(book);
    res.render("books.ejs", { book });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
