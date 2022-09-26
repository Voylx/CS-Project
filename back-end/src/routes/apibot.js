const express = require("express");
const { v4: uuidv4 } = require("uuid");

const db = require("../services/db");

const authgetuser = require("../middleware/authen_and_getuserid");

const apibottrade = require("./apibottrade");
const check = require("./check");
const bot = require("./bot/bottrade");

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

module.exports = router;
