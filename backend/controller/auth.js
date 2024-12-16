const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY;
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


exports.getUserData = (req, res) => {
  const { userId } = req.params; // ดึง userId จาก URL params
  const query = "SELECT * FROM users WHERE id = ?";

  conn.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(results[0]);
  });
};



exports.getAllUsers = (req, res) => {
  const query = "SELECT * FROM users";

  conn.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    return res.status(200).json(results);
  });
};



exports.signup = async (req, res) => {
  const { username, password, fname, lname, email, phone, agency, department, position } = req.body;

  // Check if all required fields are provided
  if (!username || !password || !fname || !lname || !email || !phone || !agency || !department || !position) {
    return res.status(400).json({
      message: "Please provide all required fields",
    });


  }
  

  try {
    // Check if the username already exists
    const checkUserQuery = "SELECT * FROM users WHERE username = ?";
    conn.execute(checkUserQuery, [username], async (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Database error while checking username",
        });
      }

      if (results.length > 0) {
        return res.status(409).json({
          message: "Username already exists",
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Insert the new user into the database
      const insertUserQuery = `
        INSERT INTO users (username, password, fname, lname, email, phone, agency, department, position) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      conn.execute(
        insertUserQuery,
        [username, hashedPassword, fname, lname, email, phone, agency, department, position],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Database error while inserting user",
            });
          }

          // Generate JWT token for the new user
          const payload = {
            user: {
              username,
              fname,
              lname,
            },
          };

          jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" }, (err, token) => {
            if (err) {
              return res.status(500).json({
                message: "Error generating token",
              });
            }

            return res.status(201).json({
              message: "User registered successfully",
              token,
            });
          });
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};


exports.confirmUser = (req, res) => {
  const { id } = req.params;
  const role = 'user'
  console.log(id);
  
  const query = "UPDATE users SET role = ? WHERE id= ?";

  conn.query(query, [role, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: `User role updated to ${role}` });
  });
};
