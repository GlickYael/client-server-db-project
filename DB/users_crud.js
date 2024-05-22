const mysql = require("mysql2");
const pool = require("./pool");

async function createUser(userToCreate) {
    try {
      var sql=` INSERT INTO users 
      (passwordId,name, email, address, phone) 
      VALUES (?,?, ?, ?, ?)`
      let values= [userToCreate.passwordId,userToCreate.name,userToCreate.email,userToCreate.address,userToCreate.phone]
      const [result] = await pool.query(sql, values);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  
  async function readAllUsers() {
    try {
      const [rows] = await pool.query("SELECT * FROM users");
      return rows;
    } catch (err) {
      console.log(err);
    }
  }
  
  async function readUser(ID) {
    try {
      const [rows] = await pool.query("SELECT * FROM users WHERE ID = ?", [ID]);
      return rows[0];
    } catch (err) {
      console.log(err);
    }
  }

  async function readUserByName(name) {
    try {
      const [rows] = await pool.query("SELECT * FROM users WHERE name = ?", [name]);
      return rows[0];
    } catch (err) {
      console.log(err);
    }
  }

  async function updateUser(userID, updatedUser) {
    try {
      var sql = `UPDATE users SET name=?, email=?, address=?, phone =? WHERE ID = ?`;
      var values=[updatedUser.name, updatedUser.email, updatedUser.address, updatedUser.phone, userID];
      const [rows] = await pool.query(sql, values);
      return rows;
    } catch (err) {
      console.log(err);
    }
  }
  
  async function deleteUser(userID) {
    try {
      await pool.query("DELETE FROM users WHERE ID = ?", [userID]);
      return;
    } catch (err) {
      console.log(err);
    }
  }
  
  //readUserByName("tre").then(a=>{console.log(a);});
  //createUser({passwordId:2,name:"asjubuhjd",email:"as@df.com",address:"viufvin 12",phone:5825649})
 //readAllUsers().then(a=>{console.log(a);});
 //readUser(1).then(a=>{console.log(a);});
// deleteUser(1);
 //updateUser(1,{name:"asdhu",email:"as@df.com",address:"viufvin 12",phone:0582305649});
 module.exports={
  createUser,
  readAllUsers,
  readUser,
  readUserByName,
  updateUser,
  deleteUser,
 }

