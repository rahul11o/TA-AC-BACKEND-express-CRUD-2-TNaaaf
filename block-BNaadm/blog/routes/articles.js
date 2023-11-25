let express = require("express");
let router = express.Router();
let Article = require("../models/article");
let Comment = require("../models/comment");

// Articles List
router.get("/", async (req, res, next) => {
  try {
    let article = await Article.find();
    res.render("articles.ejs", { article });
  } catch (error) {
    next(error);
  }
});

// Article creation
router.get("/new", (req, res, next) => {
  try {
    res.render("newArticleForm.ejs");
  } catch (error) {
    next(error);
  }
});

// save article
router.post("/", async (req, res, next) => {
  try {
    req.body.tags = req.body.tags.trim().split(" ");
    console.log(req.body.tags);
    await Article.create(req.body);
    res.redirect("/articles");
  } catch (error) {
    next(error);
  }
});
// article Details

router.get("/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    let article = await Article.findById(id).populate("comments");
    console.log(article);
    res.render("articleDetails.ejs", { article });
  } catch (error) {
    next(error);
  }
});

//updating the article
router.get("/:id/edit", async (req, res, next) => {
  try {
    let id = req.params.id;
    let article = await Article.findById(id);
    res.render("updateForm.ejs", { article });
  } catch (error) {
    next(error);
  }
});
// saving udated data to datbase

router.post("/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    await Article.findByIdAndUpdate(id, req.body);
    res.redirect("/articles/" + id);
  } catch (error) {
    next(error);
  }
});
router.get("/:id/delete", async (req, res, next) => {
  try {
    let id = req.params.id;
    await Article.findByIdAndDelete(id);
    await Comment.deleteMany({ bookId: id });
    res.redirect("/articles");
  } catch (error) {
    next(error);
  }
});
router.get("/:id/likes", async (req, res, next) => {
  try {
    let id = req.params.id;
    let article = await Article.findByIdAndUpdate(id, { $inc: { likes: 1 } });
    res.redirect("/articles/" + id);
  } catch (error) {
    next(error);
  }
});
router.get("/:id/dislikes", async (req, res, next) => {
  try {
    let id = req.params.id;
    let article = await Article.findByIdAndUpdate(id, { $inc: { likes: -1 } });
    res.redirect("/articles/" + id);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/comments", async (req, res, next) => {
  try {
    let id = req.params.id;
    req.body.bookId = id;
    console.log(req.body);
    let comment = await Comment.create(req.body);
    await Article.findByIdAndUpdate(id, { $push: { comments: comment._id } });
    res.redirect("/articles/" + id);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
