const mysql = require("mysql2");
require("dotenv").config();
    // Create a new MySQL connection with the specified database name
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
}).promise();


async function createPassword(passwordToCreate) {
    try {
      var sql=`INSERT INTO password 
      (password) 
      VALUES (?)`;
      let values=[passwordToCreate]
      const [result] = await pool.query(sql, values
      );
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  
  async function readAllPasswords() {
    try {
      const [result] = await pool.query("SELECT * FROM password");
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  
  async function readPassword(id) {
    try {
      const [result] = await pool.query("SELECT * FROM password WHERE id = ?", [id]);
      return result[0];
    } catch (err) {
      console.log(err);
    }
  }
  
  async function updatePassword(id, updatedPassword) {
    try {
      var sql=`UPDATE password SET password =? WHERE id = ?`
      let values=[updatedPassword.password,id]
      const [rows] = await pool.query(sql, values);
      return rows;
    } catch (err) {
      console.log(err);
    }

  }
  
  async function deletePassword(id) {
    try {
      console.log(id);
      await pool.query("DELETE FROM password WHERE id = ?", [id]);
      return;
    } catch (err) {
      throw new Error("database error")
    }
  }

//   createPassword({
//     password:"mnb"
// });
//  createPassword("bcd");
//  createPassword("tyu");
//  createPassword("kjh"); 
//readAllPasswords().then(a=>{console.log(a);});
//deletePassword(3);
//readPassword(1).then(a=>{console.log(a);});
//updatePassword(2,"wed")

module.exports = {
    createPassword,
    readAllPasswords,
    readPassword,
    updatePassword,
    deletePassword,
}
