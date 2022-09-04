const express = require("express");
const { v4: uuidv4 } = require("uuid");

const db = require("../services/db");
const { authen } = require("../services/authen");

const apibottrade = require("./apibottrade");
const check = require("./check");

const { Router } = require("express");

const router = express.Router();

// authen and get User_id
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
router.use("/check", check);

router.post("/addbot", (req, res) => {
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

module.exports = router;
