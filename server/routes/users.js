const express = require("express");
require("dotenv").config();
const db = require("../../DB/users_crud");
const dbp = require("../../DB/posts_crud");
const dbt = require("../../DB/todos_crud");
const dbc = require("../../DB/comments_crud");
const dbPasswords = require("../../DB/password_crud");
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const result = await db.readAllUsers();
      console.log(result);
      res.send(result);
    } catch (error) {
      console.error("Error reading users:", error);
      res.status(500).send("Internal Server Error");
    }
  })
  .post(async (req, res) => {
    try {
      const password = req.body.password;
      console.log(password);
      const passwordId = await dbPasswords.createPassword(password);
      req.body.passwordId = passwordId.insertId;
      console.log(req.body.passwordId);
      const result = await db.createUser(req.body);
      req.body.id = result.insertId;
      console.log(result);
      res.send(req.body);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send("Internal Server Error");
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const result = await db.readUser(req.params.id);
      console.log(result);
      res.send(result);
    } catch (err) {
      console.error("Error reading users:", error);
      res.status(500).send("Internal Server Error");
    }
  })
  .delete(async (req, res) => {
    try {
      const user = await db.readUser(req.params.id);
      if (!user) {
        res.status(404).send("User not found");
      }
      const passwordToDelete = await dbPasswords.readPassword(user.passwordId)
      if(!passwordToDelete)
        {
          res.status(404).send("Password not found");
        }
      const postsToDelete = await dbp.readPostsByUserId(req.params.id);
      postsToDelete.forEach(async (post) => {
        const commentsToDelete = await dbc.readCommentsByPostId(post.Id);
        commentsToDelete.forEach(async (comment) => {
          await dbc.deleteComment(comment.id);
        });
        await dbp.deletePost(post.Id);
      });
      const todosToDelete = await dbt.readTodosByUserId(req.params.id);
      todosToDelete.forEach(async (todo) => {
        await dbt.deleteTodo(todo.id);
      });
      let result = await db.deleteUser(req.params.id);
      result=await dbPasswords.deletePassword(user.passwordId)
      res.send("everything went well");
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).send("Internal Server Error");
    }
  })
  .put(async (req, res) => {
    try {
      const result = await db.updateUser(req.params.id, req.body);
      console.log(result);
      res.send(result);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).send("Internal Server Error");
    }
  });
router.post("/register", async (req, res) => {
  try {
    console.log(req.body.name);
    const result = await db.readUserByName(req.body.name);
    if (!result) {
      res.send([]);
    }
    console.log(result);
    res.send(result);
  } catch (err) {
    console.error("Error reading users:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/logIn", async (req, res) => {
  try {
    console.log(req.body.name);
    const userResult = await db.readUserByName(req.body.name);
    console.log(userResult);
    if (!userResult) {
      res.send([]);
    }
    console.log(userResult.passwordId);
    const passwordResult = await dbPasswords.readPassword(
      userResult.passwordId
    );
    console.log(passwordResult.password);
    if (
      !passwordResult.password ||
      passwordResult.password != req.body.password
    ) {
      res.send([]);
    } else {
      res.send(userResult);
    }
  } catch (err) {
    console.error("Error reading users:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id/posts", async (req, res) => {
  try {
    console.log(req.params.id);
    const result = await dbp.readPostsByUserId(req.params.id);
    console.log(result);
    res.send(result);
  } catch (err) {
    console.error("Error reading users:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id/todos", async (req, res) => {
  try {
    const result = await dbt.readTodosByUserId(req.params.id);
    console.log(result);
    res.send(result);
  } catch (err) {
    console.error("Error reading users:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
