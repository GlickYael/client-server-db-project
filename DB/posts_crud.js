const mysql = require("mysql2");
require("dotenv").config();
    // Create a new MySQL connection with the specified database name
    const pool = require("./pool");



async function createPost(postToCreate) {
    try {
      var sql = `INSERT INTO posts (userId, title, body) VALUES (?, ?, ?)`;
      var values = [
        postToCreate.userId,
        postToCreate.title,
        postToCreate.body
      ]
      const [result] = await pool.query(sql, values);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  
  async function readAllPosts() {
    try {
      const [result] = await pool.query("SELECT * FROM posts");
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  
  async function readPost(postId) {
    try {
      const [result] = await pool.query("SELECT * FROM posts WHERE Id = ?", [postId]);
      return result[0];
    } catch (err) {
      console.log(err);
    }
  }

  async function readPostsByUserId(userId){
    try {
      const [result] = await pool.query("SELECT * FROM posts WHERE userId = ?", [userId]);
      //console.log(result);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  
  async function updatePost(postId, updatedPost) {
    try {
      var sql = "UPDATE posts SET title = ?, body = ? WHERE Id = ?";
      var values = [updatedPost.title, updatedPost.body,postId];
      const [result] = await pool.query(sql, values);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  
  async function deletePost(postId) {
    try {
      await pool.query("DELETE FROM posts WHERE Id = ?", [postId]);
      return;
    } catch (err) {
      console.log(err);
    }
  }
  
//createPost({userId:1,title:"uyhgbhe",body:"iudn jbnfij iubnefke difubei fie"})
//readAllPosts().then(a=>{console.log(a);})
//readPostsByUserId(3).then(a=>{console.log(a);});
//updatePost(1,{title:"r",body:"iudn jbnfij iubnefke difubei fie"})
//deletePost(1)
module.exports = {
  createPost,
  readAllPosts,
  readPost,
  readPostsByUserId,
  updatePost,
  deletePost,
};