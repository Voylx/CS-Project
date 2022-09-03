const express = require("express");

const db = require("../services/db");
const bitkub = require("../API/bitkub");

const router = express.Router();

router.post("/apibitkub", async (req, res) => {
  const { User_id, API_key, API_secert } = req.body;

  if (!(User_id && API_key && API_secert)) {
    res.status(400).send({
      status: "error",
      message: "Incomplete information!!!",
    });
    return;
  }

  // check api to bitkub
  const result = await bitkub.balances(API_key, API_secert);
  if (result.error !== 0) {
    res.status(400).send({
      status: "error",
      message: "API_key or API_secert Invalid",
    });
    return;
  }

  db.execute(
    `INSERT IGNORE INTO bitkub (User_id, API_key, API_secert) VALUES (?,?,?)`,
    [User_id, API_key, API_secert],
    function (err, result) {
      //Check SQL Error
      if (err) {
        console.error(err);
        res.status(500).send({ status: "error", message: err.sqlMessage });
      }
      // User have already link API
      else if (result.affectedRows === 0) {
        res.status(400).send({
          status: "error",
          message: "You have entered this key already.",
        });
      }
      //
      else
        res.send({
          status: "ok",
          message: { affectedRows: result.affectedRows },
        });
    }
  );
});

router.post("/getapibitkub", (req, res) => {
  const { User_id } = req.body;
  db.execute(
    "SELECT COUNT(API_KEY) FROM bitkub Where  user_id =? ",
    [User_id],
    function (err, results) {
      //Check SQL Error
      if (err) {
        console.error(err);
        res.status(500).send({ status: "error", message: err.sqlMessage });
      } else if (results.length === 0) {
        res.status(404).send({
          status: "err",
          message: "api Not Found",
        });
      } else {
        // console.log(results[0]["COUNT(API_KEY)"]);
        res.send({
          status: "ok",
          linkAPI: Boolean(results[0]["COUNT(API_KEY)"]),
        });
      }
    }
  );
});

module.exports = router;
