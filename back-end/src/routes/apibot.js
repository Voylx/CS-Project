const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Axios = require("../services/Axios");

const db = require("../services/db");

const authgetuser = require("../middleware/authen_and_getuserid");

const apibottrade = require("./apibottrade");
const check = require("./check");
const bot = require("./bot/bottrade");
const { request } = require("express");

const router = express.Router();

router.use("/bot", bot);

// authen and get User_id
router.use(authgetuser);

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

router.post("/addselected",
  (req, res, next) => {
    const { Bot_id } = req.body;

    Axios.post("/api/check/bot_by_botid", { Bot_id }, { headers: { Authorization: req.headers.authorization } })
      .then((response) => {
        req.body.botType = response?.data?.bot?.Type
        next();
      }).catch((error) => {
        res.status(500).send(error?.response?.data)
      })

  }, (req, res, next) => {
    const { Sym, Strategys_Id, botType, Amt_money } = req.body;
    if (botType) {
      if (!(Sym && Strategys_Id && Amt_money)) {
        res.status(400).send({
          status: "error",
          message: "Incomplete request ",
        });
        return;
      }
    }
    else {
      if (!(Sym && Strategys_Id)) {
        res.status(400).send({
          status: "error",
          message: "Incomplete request ",
        });
        return;
      }
    }
    next();

  }, (req, res) => {
    const { User_id, Bot_id, Sym, Strategys_Id, botType, Amt_money } = req.body;
    db.execute("", [], function (err, res) {
      if (err) {
        console.error(err);
        res.status(500).send({ status: "error", message: err.sqlMessage });
      }
    })
    console.log({ User_id, Bot_id, Sym, Strategys_Id, botType, Amt_money });
    res.send(req.body)
  })

module.exports = router;
