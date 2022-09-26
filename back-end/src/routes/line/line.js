const express = require("express");

const db = require("../../services/db");

const authgetuser = require("../../middleware/authen_and_getuserid");

const router = express.Router();

const line = require("../../services/line");

router.post("/linewebhook", (req, res) => {
  const { events } = req.body;
  const lineuserid = events[0].source.userId;
  const replyToken = events[0].replyToken;
  const text = events[0]?.message?.text;
  // prettier-ignore
  if (!text) {  res.send("ok"); return; }

  //todooooo
  //เอาlineuseridไปเชคในตาราง line
  db.query(
    "SELECT * FROM line WHERE LineUser_id = ?",
    [lineuserid],
    (err, lineUsers) => {
      // prettier-ignore
      if (err) {res.status(500).send({ status: "error", message: err }); return; }
      // prettier-ignore
      if (lineUsers.length > 0) { res.send("ok"); return; }
      // ถ้าไม่มี ค่อยทำ
      console.log(text);
      // check text and rand_num
      db.query(
        "SELECT * FROM prelinkline WHERE rand_num = ?",
        [text],
        (err, data) => {
          // prettier-ignore
          if (err) {res.status(500).send({ status: "error", message: err }); return; }
          // prettier-ignore
          if (data.length === 0) { res.send("ok"); return; }

          // store line_users_id in line table
          db.execute(
            "INSERT INTO line (User_id, LineUser_id) VALUES (?,?); ",
            [data[0].User_id, lineuserid],
            (err, results) => {
              if (err) {
                console.log(err);
                res.status(500).send({ status: "error", message: err });
                return;
              }
              db.execute(
                "DELETE FROM prelinkline WHERE User_id = ?",
                [data[0].User_id],
                (err, results) => {
                  if (err) {
                    console.log(err);
                    res.status(500).send({ status: "error", message: err });
                    return;
                  }

                  line.reply(replyToken, "Connect Success");
                  res.send("ok");
                }
              );
            }
          );
        }
      );
    }
  );
});

router.post("/pushtextmessage", (req, res) => {
  const { text, lineuserid } = req.body;
  if (!text || !lineuserid) {
    res.status(400).send({
      status: "error",
      message: "Incomplete request",
    });
    return;
  }

  const resp = line.push(lineuserid, text);
  console.log(resp);
  res.send(resp);
});

router.post("/prelinkline", authgetuser, (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

module.exports = router;

//@336coaib
