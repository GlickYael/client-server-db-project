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
module.exports =pool;