require("dotenv").config;
const express = require("express");
const server = express();
const port = 3000;
const DB= require("../DB/connection")
//const db = require(process.env.USER_PATH)
//const router = express.Router();

const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
const todosRouter = require("./routes/todos");
const passwordsRouter = require("./routes/passwords");

server.listen(port,async () => {
  const connect =await DB.createDB();
  console.log(`our app listening on port ${port}!`)});

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Update this with your frontend URL
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

server.use(express.json());

// server.use((err, req, res, ) => {
//     console.log(err.stack)
//    res.status(500).send('Error: ' + err.stack);
// })

server.use("/users", usersRouter);
server.use('/posts',postsRouter);
server.use('/todos',todosRouter);
server.use('/passwords',passwordsRouter);
server.use('/comments',commentsRouter);
