const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Axios = require("../services/Axios");

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

router.post("/addselected", async (req, res) => {
  const { User_id, Bot_id, Sym, Strategys_Id, Amt_money } = req.body;

  console.log(req.headers);

try {
  const checkbot = await Axios.post("/api/check/bot_by_botid", {
    Bot_id
  },
    {
      headers: { Authorization: req.headers.authorization },
    });

  console.log(checkbot.data);
} catch (error) {
  console.log(error.response.data);
  res.status(500).send({ status: "error", error: error?.response?.data });

}
  

  // if (!(User_id, Bot_id, Sym, Strategys_Id)) {
  //   res.status(400).send({
  //     status: "error",
  //     message: "Incomplete information!!!",
  //   });
  //   return;
  // }
  // res.send({ status: "ok", message: "Add Select", data: req.body });
})

module.exports = router;
