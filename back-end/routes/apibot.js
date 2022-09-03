const express = require("express");
const { v4: uuidv4 } = require("uuid");

const db = require("../services/db");
const { authen } = require("../services/authen");

const apibottrade = require("./apibottrade");
const { Router } = require("express");

const router = express.Router();

router.use((req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const Auth = authen(token);
    if (Auth.status !== "ok") res.send(Auth);
    else {
      req.body.User_id = Auth.decode.User_id;
      next();
    }
  } catch (error) {
    res.status(400).send({ status: "error", message: "Token invalid" });
  }
});

router.use(apibottrade);

router.post("/add", (req, res) => {
  //add to BOT TABLE
  const { User_id, Type } = req.body;
  const Bot_id = uuidv4();
  db.execute(
    `INSERT INTO bot (Bot_id,User_id,Type) 
    SELECT ?,?,?
    WHERE NOT EXISTS(
      SELECT User_id,Type FROM bot WHERE User_id = ? AND Type = ?)`,
    [Bot_id, User_id, Type, User_id, Type],
    function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).send({ status: "error", message: err.sqlMessage });
      } else if (result.affectedRows === 0) {
        res.status(400).send({
          status: "error",
          message: "Bot has been created",
        });
      } else res.send({ status: "ok", message: "Create Bot Success" });
    }
  );
});
router.post("/delete", (req, res) => {
  //delete Bot in BOT TABLE
});

router.post("/checkbot", (req, res) => {
  const { User_id, Type } = req.body;
  // check type in
  if (Type === undefined) {
    res.status(400).send({
      status: "error",
      message: "Incomplete request (Type)",
    });
    return;
  }
  db.execute(
    "SELECT * FROM bot Where user_id = ? and type = ?",
    [User_id, Type],
    function (err, results) {
      //Check SQL Error
      if (err) {
        console.error(err);
        res.status(500).send({ status: "error", message: err.sqlMessage });
      } else if (results.length === 0) {
        res.send({
          status: "ok",
          bot: null,
        });
      } else {
        res.send({
          status: "ok",
          bot: results[0],
        });
      }
    }
  );
});

router.post("/checkbot_by_botid", (req, res) => {
  const { User_id, Bot_id } = req.body;
  // check type bot
  if (!Bot_id) {
    res.status(400).send({
      status: "error",
      message: "Incomplete request (Bot_id)",
    });
    return;
  }
  db.execute(
    "SELECT * FROM bot WHERE User_id =? and Bot_id =?",
    [User_id, Bot_id],
    function (err, results) {
      //Check SQL Error
      if (err) {
        console.error(err);
        res.status(500).send({ status: "error", message: err.sqlMessage });
      } else if (results.length === 0) {
        res.status(404).send({
          status: "err",
          message: "Bot_id Not Found",
        });
      } else {
        res.send({
          status: "ok",
          bot: results[0],
        });
      }
    }
  );
});

module.exports = router;
