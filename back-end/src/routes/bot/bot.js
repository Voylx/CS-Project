const express = require("express");
const { db } = require("../../services/db");
const BTK = require("../../API/bitkub");

const calc_strategy = require("../../strategies/calc_strategy");

const cron_bot = require("./cron_bot");
const router = express.Router();

router.use(cron_bot);

//get api_key from database (only methods post)
router.post("/", function (req, res, next) {
  const { User_id } = req.body;

  if (!User_id) {
    res.status(400).send({
      status: "error",
      message: "Incomplete information!!!",
    });
    return;
  }

  const sql = "SELECT API_key, API_secert FROM bitkub WHERE User_id = ?";
  db.execute(sql, [User_id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ status: "error", message: err.message });
      return;
    }
    if (!result[0]) {
      res.status(404).send({
        status: "error",
        message: "API_key or API_secert Not found",
      });
    } else {
      // SAVED API_KEY IN REQUEST BODY
      req.headers.BTK = {
        key: result[0].API_key,
        secert: result[0].API_secert,
      };
      next();
    }
  });
});

router.post("/place_bid", (req, res) => {
  const { sym, amt } = req.body;

  if (!(sym && amt)) {
    res.status(400).send({
      status: "error",
      message: "Incomplete information!!!",
    });
    return;
  }

  const API = req.headers.BTK;
  // const sym = "THB_XLM";

  // const amt = 10;
  BTK.place_bid(API, "THB_" + sym, amt)
    .then((data) => {
      // save to database
      // สมมุติว่า save แล้ว
      //
      res.send({ status: "ok", data });
    })
    .catch((err) => {
      console.log("error:", err);
      res.status(501).send({ status: "error", message: err });
    });
});

router.post("/place_ask", (req, res) => {
  const { sym, amt } = req.body;

  if (!(sym && amt)) {
    res.status(400).send({
      status: "error",
      message: "Incomplete information!!!",
    });
    return;
  }

  const API = req.headers.BTK;
  // const sym = "THB_XLM";

  // const amt = 10;
  BTK.place_ask(API, "THB_" + sym, amt)
    .then((data) => {
      console.log(data);

      // save to database
      // สมมุติว่า save แล้ว
      //
      res.send({ status: "ok", data });
    })
    .catch((err) => {
      console.log("error:", err);
      res.status(501).send({ status: "error", message: err });
    });
});

router.get("/getsymaction", async (req, res) => {
  const { stg } = req.query;
  console.log(stg);
  const response = await calc_strategy(stg);
  // const response = await calc_strategy("ema_10_21");

  //filter Action
  const sym_action = {
    strategy: response.strategy,
    action: response.result
      ? Object.fromEntries(
          Object.entries(response.result).filter(([k, v]) => {
            return v === "BUY🟢" || v === "SELL🔴";
          })
        )
      : "Something went wrong.",
  };

  console.log(sym_action);
  res.send({ status: "ok", sym_action });
});

router.get("/test", async (req, res) => {
  // const [sym, tf, stg] = ["BNB", 60, "ema_10_21_test"];
  const [sym, stg_id] = ["BNB", 5];

  const strategies = require("../../strategies/emacross");
  const strategy_name = {
    1: ["cdc_test", "1D"],
    2: ["cdc_test", "240"],
    3: ["ema_10_21_test", "1D"],
    4: ["ema_10_21_test", "240"],
    5: ["ema_10_21_test", "60"],
  };
  const [stg, tf] = strategy_name[stg_id];

  const data = await BTK.getclosechart(sym, tf, 200);
  const { slow, fast } = strategies[stg](data);
  res.send({ status: "ok", slow, fast });
});

module.exports = router;