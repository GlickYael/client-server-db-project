const express = require("express");
require("dotenv").config();
const db = require("../../DB/todos_crud");
const router = express.Router();

router
.route('/')
.get( async (req, res) => {
  try {
    const result = await db.readAllTodos();
    console.log(result);
    res.send(result);
  } catch (error) {
    console.error("Error reading todos:", error);
    res.status(500).send("Internal Server Error");
  }
})
.post( async (req, res) => {
  try {
    const result = await db.createTodo(req.body);
    console.log(result);
    res.send(req.body);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).send("Internal Server Error");
  }
})
router
.route("/:id")
.get(async (req, res) => {
try{
  const result = await db.readTodo(req.params.id);
  console.log(result);
  res.send(result);
}catch(err){
  console.error("Error reading todo:", error);
  res.status(500).send("Internal Server Error");
}
})
.delete(
  async (req, res) => {
    try {
      const result = await db.deleteTodo(req.params.id);
      console.log(result);
      res.send(result);
    } catch (error) {
      console.error("Error deleting todo:", error);
      res.status(500).send("Internal Server Error");
    }
  }
)
.put(
  async (req, res) => {
    try {
      const result = await db.updateTodo(req.params.id, req.body);
      console.log(result);
      res.send(result);
    } catch (error) {
      console.error("Error updating todo:", error);
      res.status(500).send("Internal Server Error");
    }
  }
)

module.exports = router;
