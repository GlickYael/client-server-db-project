const mysql = require("mysql2");
require("dotenv").config();
// Create a new MySQL connection with the specified database name
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
  })
  .promise();

async function createComment(commentToCreate) {
  try {
    var sql = `INSERT INTO comments 
      (postId, name, email, body) 
      VALUES ( ?, ?, ?, ?)`;
    let values = [
      commentToCreate.postId,
      commentToCreate.name,
      commentToCreate.email,
      commentToCreate.body,
    ];
    const [result] = await pool.query(sql, values);
    return result;
  } catch (err) {
    console.log(err);
  }
}

async function readAllComments() {
  try {
    const [rows] = await pool.query("SELECT * FROM comments");
    return rows;
  } catch (err) {
    console.log(err);
  }
}

async function readComment(id) {
  try {
    const [rows] = await pool.query("SELECT * FROM comments WHERE id = ?", [
      id,
    ]);
    return rows[0];
  } catch (err) {
    console.log(err);
  }
}
async function readCommentsByPostId(id) {
  try {
    const [result] = await pool.query("SELECT * FROM comments WHERE postId = ?", [
      id,
    ]);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
}

async function updateComment(id, updatedComment) {
  try {
    var sql = `UPDATE comments SET postId=?,name=?,email=?,body=? WHERE id = ?`;
    let values = [
      updatedComment.postId,
      updatedComment.name,
      updatedComment.email,
      updatedComment.body,
      id,
    ];
    const [rows] = await pool.query(sql, values);
    return rows;
  } catch (err) {
    console.log(err);
  }
}

async function deleteComment(id) {
  try {
    await pool.query("DELETE FROM comments WHERE id = ?", [id]);
    return;
  } catch (err) {
    console.log(err);
  }
}



//createComment({postId:2,name:"iufbos",email:"hofb obhsd ihb",body:"dnvoud"});
//readAllComments().then(a=>{console.log(a);});
//deleteComment(1);
//readComment(1).then(a=>{console.log(a);});
//updateComment(1,{postId:2,name:"i",email:"hofb obhsd ihb",body:"dnvoud"})
//readCommentsByPostId(10).then(a=>{console.log(a);});

module.exports = {
  createComment,
  readAllComments,
  readComment,
  readCommentsByPostId,
  updateComment,
  deleteComment,
};
