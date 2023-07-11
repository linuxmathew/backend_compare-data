const express = require("express");
const cors = require("cors");
// const middleware = require("./middleware");
const pool = require("./database/db");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

// use middleware globally
// app.use(middleware.decodeToken);

// for registration
app.post("/api/register", async (req, res) => {
  try {
    const { names, email, username, password } = req.body;

    const query =
      "INSERT INTO users (names, email, username, password) VALUES ($1, $2, $3, $4)";
    const values = [names, email, username, password];
    await pool.query(query, values);
    res.status(200).json({ message: "User Registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// update company
app.put("/api/users/:userId/companies", async (req, res) => {
  console.log("message body", req.body);
  try {
    const { userId } = req.params;
    const { noOfCompany, productPerCompany } = req.body;

    // Check if userId exists in the database
    const checkQuery = `SELECT uid FROM users WHERE uid = $1`;
    const checkValues = [userId];
    const { rows } = await pool.query(checkQuery, checkValues);
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's company details in the database
    const updateQuery = `UPDATE users 
    SET noofcompanies = $1, productpercompany = $2
    WHERE uid = $3`;
    const updateValues = [noOfCompany, productPerCompany, userId];
    await pool.query(updateQuery, updateValues);

    res
      .status(200)
      .json({ message: "User company details updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// admin
app.get("/api/users", async (req, res) => {
  try {
    console.log("request", req);
    const query = "SELECT * FROM users";
    const { rows } = await pool.query(query);
    res.json({ obj: rows });
    console.log(query);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
// app.listen();
