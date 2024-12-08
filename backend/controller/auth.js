const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "jwtsecret";
const saltRounds = 10;
const conn = require("../config/db");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Please provide username and password",
    });
  }

  const sql = "SELECT * FROM users WHERE username = ?";
  conn.execute(sql, [username], async (err, results) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const payload = {
      user: {
        username: user.username,
        role: user.role,
      },
    };

    jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" }, (err, token) => {
      if (err) {
        return res.status(500).json({
          message: "Error generating token",
        });
      }
      res.status(200).json({ token, payload });
    });
  });
};


exports.getUserProfile = (req, res) => {
  const { username } = req.params;

  const query = "SELECT id, username, fname, lname, agency, department, position FROM users WHERE username = ?";

  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(results[0]); // ส่งกลับข้อมูลผู้ใช้ที่ค้นหา
  });
};
