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

module.exports = router;
