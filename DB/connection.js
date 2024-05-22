const { log } = require("console");
var mysql = require("mysql2");
const { resolve } = require("path");
require("dotenv").config();

// Create a new MySQL connection
const con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASSWORD,
});

let pool;
async function createDB() {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    // Check if the database exists
    con.query(
      "SHOW DATABASES LIKE ?",
      [process.env.MYSQL_DATABASE],
      async function (err, result) {
        if (err) {
          throw err;
        }
        if (result.length === 0) {
          // Database doesn't exist, create it
          con.query(
            "CREATE DATABASE " + process.env.MYSQL_DATABASE,
            function (err, result) {
              if (err) {
                throw err;
              }
              console.log("Database created");
              connectToDB();
              // Now that the database is created, reconnect to it
            }
          );
        } else {
          // Database already exists
          console.log("Database already exists");
          connectToDB();
        }
      }
    );
  });
}
function connectToDB() {
  // Create a new MySQL connection with the specified database name
  pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
  });
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    console.log("Connected!");
    createPasswordTable();
  });
}

async function createUsersTable() {
  pool.query("SHOW TABLES LIKE 'users'", async function (err, result) {
    if (err) {
      throw err;
    }
    if (result.length === 0) {
      // Table doesn't exist, create it
      pool.query(
        `
                    CREATE TABLE users (
                        ID INT AUTO_INCREMENT,
                        passwordId INT NOT NULL,
                        name VARCHAR(255) NOT NULL,
                        email VARCHAR(255) NOT NULL,
                        address VARCHAR(255) NOT NULL,
                        phone INT (15) NOT NULL, 
                        PRIMARY KEY (ID, name),
                        FOREIGN KEY (passwordId) REFERENCES password(id)
                    )
                    `,
        function (err, result) {
          if (err) {
            throw err;
          }
          console.log("The 'users' table has been successfully created.");
          createPostsTable();
          createTodosTable();
        }
      );
    } else {
      // Table already exists
      console.log("The 'users' table already exists.");
      createPostsTable();
      createTodosTable();
    }
  });
}

async function createPostsTable() {
  pool.query("SHOW TABLES LIKE 'posts'", async function (err, result) {
    if (err) {
      throw err;
    }
    if (result.length === 0) {
      // Table doesn't exist, create it
      pool.query(
        `
                    CREATE TABLE posts (
                        userId INT NOT NULL,
                        Id INT PRIMARY KEY AUTO_INCREMENT,
                        title VARCHAR(255) NOT NULL,
                        body TEXT NOT NULL,
                        FOREIGN KEY (userId) REFERENCES users(ID)
                    )
                    `,
        function (err, result) {
          if (err) {
            throw err;
          }
          console.log("The 'posts' table has been successfully created.");
          createCommentsTable();
        }
      );
    } else {
      // Table already exists
      console.log("The 'posts' table already exists.");
      createCommentsTable();
    }
  });
}

async function createTodosTable() {
  pool.query("SHOW TABLES LIKE 'todos'", async function (err, result) {
    if (err) {
      throw err;
    }
    if (result.length === 0) {
      // Table doesn't exist, create it
      pool.query(
        `
                    CREATE TABLE todos (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        userId INT NOT NULL,
                        title VARCHAR(255) NOT NULL,
                        completed BOOLEAN NOT NULL,
                        FOREIGN KEY (userId) REFERENCES users(ID)
                    )
                    `,
        function (err, result) {
          if (err) {
            throw err;
          }
          console.log("The 'todos' table has been successfully created.");
        }
      );
    } else {
      // Table already exists
      console.log("The 'todos' table already exists.");
    }
  });
}

async function createCommentsTable() {
  pool.query("SHOW TABLES LIKE 'comments'", async function (err, result) {
    if (err) {
      throw err;
    }
    if (result.length === 0) {
      // Table doesn't exist, create it
      pool.query(
        `
                    CREATE TABLE comments (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        postId INT NOT NULL,
                        name VARCHAR(255) NOT NULL,
                        email VARCHAR(255) NOT NULL,
                        body TEXT NOT NULL,
                        FOREIGN KEY (postId) REFERENCES posts(Id)
                    )
                    `,
        function (err, result) {
          if (err) {
            throw err;
          }
          console.log("The 'comments' table has been successfully created.");
        }
      );
    } else {
      // Table already exists
      console.log("The 'comments' table already exists.");
    }
  });
}

async function createPasswordTable() {
  pool.query("SHOW TABLES LIKE 'password'", async function (err, result) {
    if (err) {
      throw err;
    }
    if (result.length === 0) {
      // Table doesn't exist, create it
      pool.query(
        `
                    CREATE TABLE password (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        password VARCHAR(255) NOT NULL
                    )
                    `,
        function (err, result) {
          if (err) {
            throw err;
          }
          console.log("The 'password' table has been successfully created.");
          createUsersTable();
        }
      );
    } else {
      // Table already exists
      console.log("The 'password' table already exists.");
      createUsersTable();
    }
  });
}

async function createTables() {
  //   createPasswordTable()
  // .then(()=>{ createUsersTable()
  //   .then(()=>{
  //      createPostsTable()
  //     .then(()=>{
  //        createCommentsTable();
  //   })
  //    createTodosTable();
  //   })
  // });
  //await createPasswordTable();
  // await createUsersTable();
  // await createPostsTable();
  // await createTodosTable();
  // await createCommentsTable();
}

module.exports = {createDB}
//createDB();
