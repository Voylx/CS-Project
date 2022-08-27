const express = require("express");
const cors = require("cors");
const db = require("./db");
const { v4: uuidv4 } = require("uuid");

const bcrypt = require("bcrypt");
const saltRounds = 13;

const authen = require("./authen");

const apibottrade = require("./routes/apibottrade");

const app = express();

const port = 3333;

app.use(cors());
app.use(express.json());

app.use("/bot", apibottrade);

app.post("/register", function (req, res, next) {
  const { email, username, password } = req.body;
  const user_id = uuidv4();
  if (!(email && username && password)) {
    res.send({ status: "error", message: "Incomplete information!!!" });
  } else {
    // check if the email is already in the database
    db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email],
      function (err, users) {
        if (err) {
          console.error(err);
        } else {
          if (users.length > 0)
            res.send({
              status: "error",
              message: "This Email is already registered",
            });
          else {
            bcrypt.hash(password, saltRounds, function (err, hash) {
              // Store hash in your password DB.
              db.execute(
                "INSERT INTO users (user_id, username, email, password) VALUES (?,?,?,?)",
                [user_id, username, email, hash],
                function (err, results) {
                  if (err) {
                    console.log(err);
                    res.send({ status: "error", message: err });
                  } else {
                    // console.log(results);
                    res.send({ status: "ok", message: results });
                  }
                }
              );
            });
          }
        }
      }
    );
  }
});

app.post("/login", function (req, res, next) {
  const { email, password } = req.body;

  db.execute(
    "SELECT * FROM users WHERE email = ?",
    [email],
    function (err, users) {
      // console.log(users);
      if (err) {
        res.send({ status: "error", message: err });
        return;
      }
      if (users.length === 0) {
        res.send({ status: "error", message: "User not found" });
        return;
      }
      console.log(password, users[0].password);

      bcrypt.hash(password, saltRounds, function (err, hash) {
        // console.log(hash);
      });

      bcrypt.compare(password, users[0].password, function (err, result) {
        if (result) {
          const token = jwt.sign({ user_id: users[0].user_id }, secert, {
            expiresIn: "1h",
          });
          res.send({ status: "ok", message: "login success", token: token });
        } else {
          res.send({
            status: "error",
            message: "The password that you've entered is incorrect.",
          });
        }
      });
    }
  );
});

app.post("/authen", function (req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  // console.log(token);
  const response = authen(token);
  res.send(response);
});

app.listen(port, function () {
  console.log("CORS-enabled web server listening on port " + port);
});
