const express = require("express");
const db = require("../../services/db");

const router = express.Router();

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
      return;
    }
    console.log(result[0]);
    next();
  });
});

router.get("/test", (req, res) => {
  console.log("test");
  res.send({ status: "ok" });
});

module.exports = router;
