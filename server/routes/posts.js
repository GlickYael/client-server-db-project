const express = require("express");
require("dotenv").config();
const db = require("../../DB/posts_crud");
const dbc = require("../../DB/comments_crud");
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const result = await db.readAllPosts();
      console.log(result);
      res.send(result);
    } catch (error) {
      console.error("Error reading posts:", error);
      res.status(500).send("Internal Server Error");
    }
  })
  .post(async (req, res) => {
    try {
      const result = await db.createPost(req.body);
      console.log(result);
      res.send(req.body);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).send("Internal Server Error");
    }
  });
router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const result = await db.readPost(req.params.id);
      console.log(result);
      res.send(result);
    } catch (err) {
      console.error("Error reading post:", error);
      res.status(500).send("Internal Server Error");
    }
  })
  .delete(async (req, res) => {
    try {
      const commentsToDelete = await dbc.readCommentsByPostId(req.params.id)
      commentsToDelete.map(async(comment)=>{
        await dbc.deleteComment(comment.id)
      })
      const result = await db.deletePost(req.params.id);
      console.log(result);
      res.send(result);
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).send("Internal Server Error");
    }
  })
  .put(async (req, res) => {
    try {
      const result = await db.updatePost(req.params.id, req.body);
      console.log(result);
      res.send(result);
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).send("Internal Server Error");
    }
  });

router.get("/:id/comments", async (req, res) => {
  try {
    console.log(req.params.id);
    console.log("waaaa");
    const result = await dbc.readCommentsByPostId(req.params.id);
    console.log(result);
    res.send(result);
  } catch (err) {
    console.error("Error reading users:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
