"use strict";

const express = require("express");

const BTK = require("../API/bitkub");
const getapikey = require("../middleware/getapikey");

const router = express.Router();

// add api bitkub
router.post("/add_apibitkub", async (req, res) => {
  const db = await require("../services/db_promise");
  const { User_id, API_key, API_secert } = req.body;

  if (!(User_id && API_key && API_secert)) {
    res.status(400).send({
      status: "error",
      message: "Incomplete information!!!",
    });
    return;
  }
  try {
    // check api to bitkub
    const resp = await BTK.balances(API_key, API_secert);
    if (resp.error !== 0) {
      res.status(400).send({
        status: "error",
        message: "API_key or API_secert Invalid",
      });
      return;
    }
    const [result] = await db.execute(
      `INSERT IGNORE INTO bitkub (User_id, API_key, API_secert) VALUES (?,?,?)`,
      [User_id, API_key, API_secert]
    );
    if (result.affectedRows === 0) {
      res.status(400).send({
        status: "error",
        message: "You have already added the key.",
      });
    }
    //
    else
      res.send({
        status: "ok",
        message: { affectedRows: result.affectedRows },
      });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "error", message: error });
  }
});

// delete api bitkub
router.post("/del_apibitkub", (req, res) => {
  res.send({ status: "ok", message: "ยังไม่ได้ทำ" });
});

// update api BTK
router.post("/update_apibitkub", async (req, res) => {
  const db = await require("../services/db_promise");
  const { User_id, API_key, API_secert } = req.body;
  if (!(User_id && API_key && API_secert)) {
    res.status(400).send({
      status: "error",
      message: "Incomplete information!!!",
    });
    return;
  }
  try {
    // check api to bitkub
    const resp = await BTK.balances(API_key, API_secert);
    if (resp.error !== 0) {
      res.status(400).send({
        status: "error",
        message: "API_key or API_secert Invalid",
      });
      return;
    }
    const [result] = await db.execute(
      `UPDATE bitkub SET API_key =? ,API_secert =? WHERE User_id=?`,
      [API_key, API_secert, User_id]
    );
    // User have already link API
    if (result.affectedRows === 0) {
      res.status(400).send({
        status: "error",
        message: "You have already added the key.",
      });
    } else
      res.send({
        status: "ok",
        message: { affectedRows: result.affectedRows },
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: "error", message: error.sqlMessage || error });
  }
});

// get available balance from BTK
router.post("/available_balance", getapikey, async (req, res) => {
  const db = await require("../services/db_promise");
  const client_API = req.headers.BTK;
  const { Bot_id } = req.body;
  if (!Bot_id) {
    res.status(400).send({
      status: "error",
      message: "Incomplete information!!!",
    });
    return;
  }

  try {
    const all = await BTK.wallet(client_API.key, client_API.secert).then(
      (resp) => resp.result.THB
    );
    const sql = `
    SELECT selected.Bot_id,
      SUM(money.Amt_money) as waitOrder
      FROM selected
      JOIN money on selected.Bot_id=money.Bot_id AND selected.Sym = money.Sym
      LEFT JOIN (
            SELECT h1.* FROM history h1
          INNER JOIN
            (
            SELECT Bot_id,Sym,max(Timestamp) as mts FROM history
            GROUP BY Bot_id,Sym
            ) h2 on h2.Sym = h1.Sym  AND h2.Bot_id = h1.Bot_id AND h1.Timestamp = mts
              
          ) H ON selected.Bot_id = H.Bot_id AND selected.Sym = H.sym
      
      WHERE (Side  IS NULL OR Side = "SELL") AND selected.Bot_id = ?
      GROUP BY selected.Bot_id;`;
    const [data] = await db.execute(sql, [Bot_id]);
    const waitOrder = (await data[0]?.waitOrder) || 0;
    const available = all - waitOrder || 0;

    res.send({ status: "ok", all, waitOrder, available });
  } catch (error) {
    console.log(error);
    res.send({ status: "error", message: error?.sqlMessage ?? error });
  }
});

router.post("/bot_info", async (req, res) => {
  const db = await require("../services/db_promise");
  const Axios = require("../services/Axios");

  const { Bot_id } = req.body;
  if (!Bot_id) {
    res.status(400).send({
      status: "error",
      message: "Incomplete information!!!",
    });
    return;
  }

  try {
    const selected_sym = await db
      .query("SELECT Sym FROM `selected` WHERE Bot_id = ?", [Bot_id])
      .then(([data]) =>
        data.map((v) => {
          return v.Sym;
        })
      );

    const status_promise = selected_sym.map((v) => {
      return Axios.post(
        "/api/getbotstatus",
        {
          Bot_id: Bot_id,
          Sym: v,
        },
        { headers: { Authorization: req.headers.authorization } }
      ).then((res) => res.data);
    });

    const statuses = await Promise.all(status_promise);

    const price_all = await BTK.getprice();

    let sumBalance = 0,
      sumInit = 0;
    statuses.map((v) => {
      const price = price_all[v.Sym].last;
      sumInit += v.Initial_money;
      if (v.active === "Waiting for signal.") {
        sumBalance += v.Initial_money;
      }
      if (v.active === "Already BUY") {
        sumBalance += price * v.curr_coin;
      }
      if (v.active === "Waiting to Buy") {
        sumBalance += v.curr_money;
      }
    });

    const pnl = sumBalance - sumInit;
    const pnl_percent = (pnl / sumInit) * 100;

    res.send({
      status: "ok",
      Balance: sumBalance,
      Initial_money: sumInit,
      pnl,
      pnl_percent,
    });
  } catch (error) {
    console.log(error);
    res.send({ status: "error", message: error?.sqlMessage ?? error });
  }
});

module.exports = router;
