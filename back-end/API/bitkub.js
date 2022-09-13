const axios = require("axios");
const crypto = require("crypto");

// const API = require("./secret.json");

axios.defaults.baseURL = "https://api.bitkub.com";

const header = (key) => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-BTK-APIKEY": key,
  };
};

function hash(data, secert) {
  const j = JSON.stringify(data);
  return crypto.createHmac("sha256", secert).update(j).digest("hex");
}

const getSevertime = async () => {
  return Math.round(new Date() / 1000);
};

const getsymbols = async () => {
  const result = await axios.get("/api/market/symbols");
  return result.data.result;
};

const balances = async (key, secert) => {
  const ts = await getSevertime();

  const data = { ts: ts };
  data.sig = hash(data, secert);

  try {
    const result = await axios.post("/api/market/balances", data, {
      headers: header(key),
    });
    return result.data;
  } catch (err) {
    // console.error(err);
    return { error: err };
  }
};

const place_bid = async ({ key, secert }, sym, amt) => {
  // EX.symbol "THB_BTC"
  const ts = await getSevertime();

  const data = {
    ts: ts,
    sym: sym,
    amt: amt,
    typ: "market",
    rat: 0,
  };
  data.sig = hash(data, secert);

  try {
    const result = await axios.post("/api/market/place-bid/test", data, {
      headers: header(key),
    });
    return result.data;
  } catch (err) {
    return err;
  }
};

const place_ask = async ({ key, secert }, sym, amt) => {
  const ts = await getSevertime();

  const data = {
    ts: ts,
    sym: sym,
    amt: amt,
    typ: "market",
    rat: 0,
  };
  data.sig = hash(data, secert);

  try {
    const result = await axios.post("/api/market/place-ask/test", data, {
      headers: header(key),
    });
    return result.data;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getSevertime,
  balances,
  place_bid,
  place_ask,
};
