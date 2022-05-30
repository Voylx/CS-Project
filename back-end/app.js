const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const { v4: uuidv4 } = require("uuid");

const bcrypt = require("bcrypt");
const saltRounds = 13;

const app = express();

const port = 3333;

app.use(cors());
app.use(express.json());

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "database-csproject",
});

app.post("/register", function (req, res, next) {
  const { email, username, password } = req.body;
  const user_id = uuidv4();

  //   console.log(user_id, email, username, password);
  bcrypt.hash(password, saltRounds, function (err, hash) {
    // Store hash in your password DB.
    connection.execute(
      "INSERT INTO users (user_id, username, email, password) VALUES (?,?,?,?)",
      [user_id, username, email, hash],
      function (err, results) {
        if (err) {
          console.log(err);
          res.send({ status: "error", message: err });
        } else {
          console.log(results);
          res.send({ status: "ok", message: results });
        }
      }
    );
  });
});

app.listen(port, function () {
  console.log("CORS-enabled web server listening on port " + port);
});
