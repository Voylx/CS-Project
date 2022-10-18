const express = require("express");
const Axios = require("../services/Axios");
const bitkub = require("../API/bitkub");

const router = express.Router();

router.get("/test", function (req, res) {
  res.send("test /api/test get");
});

router.get("/tickers", async (req, res) => {
  const getsym = await Axios.get("/symbols");
  const sym = getsym?.data?.symbols;

  const data = await bitkub.getticker();

  // console.log(sym);
  const results = {};

  Object.entries(data).map(([key, Value]) => {
    const V = Object.fromEntries(
      Object.entries(Value).filter(([k, v]) => {
        return k === "last" || k === "percentChange";
      })
    );
    // console.log(k.substring(4));
    if (sym.includes(key.substring(4))) results[key.substring(4)] = V;
  });

  res.send({
    status: "success",
    results,
  });
});

router.get("/getsymstghistory", async (req, res) => {
  const db = await require("../services/db_promise");

  const { Sym, Strategy_id } = req.query;
  if (!Sym || !Strategy_id) {
    res.status(400).send({
      status: "error",
      message: "Incomplete request ",
    });
    return;
  }
  try {
    const [historys] = await db.execute(
      "SELECT * FROM sym_stg_history WHERE Sym = ? AND Strategy_id =?",
      [Sym, Strategy_id]
    );
    res.send({
      status: "success",
      historys: historys,

      // username: user[0].username,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "error", message: error.sqlMessage });
  }
});
module.exports = router;
