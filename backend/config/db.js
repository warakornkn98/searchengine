const mysql = require("mysql2");
require('dotenv').config()

const conn = mysql.createConnection({
  host:   process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

conn.connect((err) => {
  if (err) throw err;
  console.log("ok");
});

module.exports = conn;
