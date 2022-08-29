const axios = require("axios");
const crypto = require("crypto");

// const API = require("./secret.json");
const url = "https://api.bitkub.com";

const Axios = axios.create({
  baseURL: "https://api.bitkub.com",
});

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
  const result = await Axios.get("/api/servertime");
  return result.data;
};

const getsymbols = async () => {
  const result = await Axios.get("/api/market/symbols");
  return result.data.result;
};

const balances = async (key, secert) => {
  const ts = await getSevertime();

  const data = { ts: ts };
  data.sig = hash(data, secert);

  try {
    const result = await Axios.post("/api/market/balances", data, {
      headers: header(key),
    });
    return result.data;
  } catch (err) {
    // console.error(err);
    return { error: "err" };
  }
};

module.exports = {
  getSevertime,
  balances,
};
