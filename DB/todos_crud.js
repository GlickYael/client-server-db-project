const mysql = require("mysql2");
require("dotenv").config();
// Create a new MySQL connection with the specified database name
const pool = require("./pool");

async function createTodo(todoToCreate) {
  try {
    var sql = `INSERT INTO todos 
      (userId, title, completed) 
      VALUES (?, ?, ?)`;
    let values = [
      todoToCreate.userId,
      todoToCreate.title,
      todoToCreate.completed,
    ];
    const [result] = await pool.query(sql, values);
    return result;
  } catch (err) {
    console.log(err);
  }
}

async function readAllTodos() {
  try {
    const [rows] = await pool.query("SELECT * FROM todos");
    return rows;
  } catch (err) {
    console.log(err);
  }
}

async function readTodo(id) {
  try {
    const [rows] = await pool.query("SELECT * FROM todos WHERE id = ?", [id]);
    return rows[0];
  } catch (err) {
    console.log(err);
  }
}

async function readTodosByUserId(userId){
  try {
    const [rows] = await pool.query("SELECT * FROM todos WHERE userId = ?", [userId]);
    return rows;
  } catch (err) {
    console.log(err);
  }
}
async function updateTodo(id, updatedTodo) {
  try {
    var sql = `UPDATE todos SET title=? ,completed=? WHERE id = ?`;
    let values = [updatedTodo.title, updatedTodo.completed, id];
    const [rows] = await pool.query(sql, values);
    return rows;
  } catch (err) {
    console.log(err);
  }
}

async function deleteTodo(id) {
  try {
    await pool.query("DELETE FROM todos WHERE id = ?", [id]);
    return;
  } catch (err) {
    console.log(err);
  }
}

//  createTodo({userId:1,
//  title:"fiubf ubesf",
//  completed:true})
//readAllTodos().then(a=>{console.log(a);})
//readTodosByUserId(1).then(a=>{console.log(a);})
//deleteTodo(1);
//updateTodo(1,{title:"6tevj nicht",completed:false});
module.exports = {
  createTodo,
  readAllTodos,
  readTodo,
  readTodosByUserId,
  updateTodo,
  deleteTodo,
};
