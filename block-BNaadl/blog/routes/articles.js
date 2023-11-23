var express = require("express");
var router = express.Router();
var Article = require("../models/articles.js");

/* GET articles listing. */
router.get("/", async (req, res, next) => {
  try {
    let allArticles = await Article.find();
    if (allArticles.length > 0) {
      res.render("articlesList.ejs", { allArticles: allArticles });
    } else {
      res.send("There is no Articles at all");
    }
  } catch (error) {
    next(error);
  }
});
/* GET article form */
router.get("/new", (req, res, next) => {
  res.render("createArticleForm.ejs");
});

// POST, creates new article
router.post("/new", async (req, res, next) => {
  try {
    let newArticle = await Article.create(req.body);
    res.redirect("/articles");
  } catch (error) {
    next(error);
  }
});

//GET, gives an article details

router.get("/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    let article = await Article.findById(id);
    res.render("articleDetails.ejs", { article: article });
  } catch (error) {
    next(error);
  }
});

//GET, gives option to edit an article
router.get("/edit/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    let article = await Article.findById(id);
    res.render("updateArticleForm.ejs", { article: article });
  } catch (error) {
    next(error);
  }
});
// POST , save updated data
router.post("/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    await Article.findByIdAndUpdate(id, req.body);
    res.redirect("/articles/" + id);
  } catch (error) {
    next(error);
  }
});
// GET, deleteing an article
router.get("/delete/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    await Article.findByIdAndDelete(id);
    res.redirect("/articles");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
