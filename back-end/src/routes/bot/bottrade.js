const express = require("express");
const db = require("../../services/db");

const BTK = require("../../API/bitkub");

const router = express.Router();

//get api_key from database
router.use((req, res, next) => {
  const { User_id } = req.body;

  const sql = "SELECT API_key, API_secert FROM bitkub WHERE User_id = ?";
  db.execute(sql, [User_id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ status: "error", message: err.sqlMessage });
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

router.get("/test", async (req, res) => {
  console.log(req.headers.BTK);

  const data = await BTK.getclosechart("BTC", "1D", 5);
  console.log(data);

  res.send({ status: "ok", message: "test" });
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

router.post("/ma", async (req, res) => {
  const { cdc } = require("../../strategies/emacross");
  const Axios = require("../../services/Axios");
  const response = [];

  try {
    const ress = await Axios.get("/symbols");
    const symbols = ress.data.symbols;
    const promises = [];

    symbols.map((sym) => {
      const data = BTK.getclosechart(sym, "1D", 30);
      promises.push(data);
    });

    const datas = await Promise.all(promises);

    const response = [];
    symbols.map((sym, i) => {
      response.push({ [sym]: cdc(datas[i]) });
    });

    res.send({ status: "ok", response });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).send(err);
  }
});

module.exports = router;
