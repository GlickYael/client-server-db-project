const express = require("express");
require("dotenv").config();
const db = require("../../DB/comments_crud");
const router = express.Router();

router
.route('/')
.get( async (req, res) => {
  try {
    const result = await db.readAllComments();
    console.log(result);
    res.send(result);
  } catch (error) {
    console.error("Error reading users:", error);
    res.status(500).send("Internal Server Error");
  }
})
.post( async (req, res) => {
  try {
    const result = await db.createComment(req.body);
    console.log(result);
    
    res.send(req.body);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Internal Server Error");
  }
})
router
.route("/:id")
.get(async (req, res) => {
try{
  const result = await db.readComment(req.params.id);
  console.log(result);
  res.send(result);
}catch(err){
  console.error("Error reading users:", error);
  res.status(500).send("Internal Server Error");
}
})
.delete(
  async (req, res) => {
    try {
      const result = await db.deleteComment(req.params.id);
      console.log(result);
      res.send(result);
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).send("Internal Server Error");
    }
  }
)
.put(
  async (req, res) => {
    try {
      const result = await db.updateComment(req.params.id, req.body);
      console.log(result);
      res.send(result);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).send("Internal Server Error");
    }
  }
)

module.exports = router;
