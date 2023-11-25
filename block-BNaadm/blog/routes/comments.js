let express = require("express");
let Comment = require("../models/comment");
let Article = require("../models/article");
let router = express.Router();

router.get("/:id/edit", async (req, res, next) => {
  try {
    let id = req.params.id;
    let comment = await Comment.findById(id);
    res.render("commentEditForm.ejs", { comment });
  } catch (error) {
    next(error);
  }
});
router.post("/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    let comment = await Comment.findByIdAndUpdate(id, req.body);
    res.redirect("/articles/" + comment.bookId);
  } catch (error) {
    next(error);
  }
});
router.get("/:id/delete", async (req, res, next) => {
  try {
    let id = req.params.id;
    let comment = await Comment.findByIdAndDelete(id);
    console.log(comment);
    await Article.findByIdAndUpdate(comment.bookId, {
      $pull: { comments: id },
    });
    res.redirect("/articles/" + comment.bookId);
  } catch (error) {
    next(error);
  }
});
router.get("/:id/likes", async (req, res, next) => {
  try {
    let id = req.params.id;
    let comment = await Comment.findByIdAndUpdate(id, { $inc: { likes: 1 } });
    res.redirect("/articles/" + comment.bookId);
  } catch (error) {
    next(error);
  }
});
router.get("/:id/dislikes", async (req, res, next) => {
  try {
    let id = req.params.id;
    let comment = await Comment.findByIdAndUpdate(id, {
      $inc: { dislikes: 1 },
    });
    res.redirect("/articles/" + comment.bookId);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
