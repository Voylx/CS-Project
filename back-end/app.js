const express = require("express");
const cors = require("cors");
const db = require("./services/db");
const { v4: uuidv4 } = require("uuid");

const bcrypt = require("bcrypt");
const saltRounds = 13;

const { authen, createToken } = require("./services/authen");

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
    res.status(400).send({
      status: "error",
      message: "Incomplete information!!!",
    });
  } else {
    //hash password
    bcrypt.hash(password, saltRounds, function (err, hash) {
      // Store hash in your password DB.
      db.execute(
        "INSERT IGNORE INTO users (user_id, username, email, password) VALUES (?,?,?,?)",
        [user_id, username, email, hash],
        function (err, result) {
          if (err) {
            console.log(err);
            res.status(500).send({ status: "error", message: err.sqlMessage });
          }
          //the email is already in the database
          else if (result.affectedRows === 0) {
            res.status(400).send({
              status: "error",
              message: "This Email is already registered",
            });
          } else
            res.send({
              status: "ok",
              message: { affectedRows: result.affectedRows },
            });
        }
      );
    });
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
        res.status(500).send({ status: "error", message: err.sqlMessage });
        return;
      }
      if (users.length === 0) {
        res.status(404).send({ status: "error", message: "User not found" });
        return;
      }
      // console.log(password, users[0].password);

      bcrypt.compare(password, users[0].password, function (err, result) {
        if (result) {
          // const token = jwt.sign({ user_id: users[0].user_id }, secert, {
          //   expiresIn: "1h",
          // });
          const token = createToken(users[0].user_id);
          res.send({ status: "ok", message: "login success", token: token });
        } else {
          res.status(400).send({
            status: "error",
            message: "The password that you've entered is incorrect.",
          });
        }
      });
    }
  );
});

app.post("/authen", function (req, res, next) {
  // console.log(req.headers.authorization);
  try {
    const token = req.headers.authorization.split(" ")[1];
    const response = authen(token);
    if (response.status === "ok") res.send(response);
    else res.status(400).send(response);
  } catch (error) {
    res.status(401).send({ status: "error", message: "Token invalid" });
  }
});

app.listen(port, function () {
  console.log("CORS-enabled web server listening on port " + port);
});
