const express = require("express");
var jwt = require("jsonwebtoken");
const db = require("../db");
const authen = require("../authen");

const router = express.Router();

router.post("/apibitkub", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  const { API_key, API_secert } = req.body;

  const Auth = authen(token);

  if (Auth.status !== "ok") res.send(Auth);
  else {
    const User_id = Auth.decode.user_id;
    // db.execute("", [], function (err, result) {});
    //check to bitkub
    // store to database
    console.log({ User_id, API_key, API_secert });
    res.send({ User_id, API_key, API_secert });
  }
});

module.exports = router;
