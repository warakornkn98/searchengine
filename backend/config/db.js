const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "cse",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("ok");
});

module.exports = conn;
