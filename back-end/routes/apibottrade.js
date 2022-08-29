const express = require("express");
const { v4: uuidv4 } = require("uuid");

const db = require("../services/db");
const { authen } = require("../services/authen");
const bitkub = require("../API/bitkub");

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
          message: "Bot has been create",
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
  // check type in BOT TABLE
  if (Type === undefined) {
    res.status(400).send({
      status: "error",
      message: "Not found information.",
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

router.post("/apibitkub", async (req, res) => {
  const { User_id, API_key, API_secert } = req.body;

  if (!(User_id && API_key && API_secert)) {
    res.status(400).send({
      status: "error",
      message: "Incomplete information!!!",
    });
    return;
  }

  // check api to bitkub
  const result = await bitkub.balances(API_key, API_secert);
  if (result.error !== 0) {
    res.status(400).send({
      status: "error",
      message: "API_key or API_secert Invalid",
    });
    return;
  }

  db.execute(
    `INSERT IGNORE INTO bitkub (User_id, API_key, API_secert) VALUES (?,?,?)`,
    [User_id, API_key, API_secert],
    function (err, result) {
      //Check SQL Error
      if (err) {
        console.error(err);
        res.status(500).send({ status: "error", message: err.sqlMessage });
      }
      // User have already link API
      else if (result.affectedRows === 0) {
        res.status(400).send({
          status: "error",
          message: "You have entered this key already.",
        });
      }
      //
      else
        res.send({
          status: "ok",
          message: { affectedRows: result.affectedRows },
        });
    }
  );
});

module.exports = router;
