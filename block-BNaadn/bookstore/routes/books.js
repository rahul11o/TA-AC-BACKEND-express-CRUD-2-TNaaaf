let express = require("express");
let router = express.Router();
let Book = require("../models/book");
let Author = require("../models/author");

router.get("/new", (req, res, next) => {
  try {
    res.render("bookForm.ejs");
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    Book.create(req.body);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
