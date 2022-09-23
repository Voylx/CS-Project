const express = require("express");
const line = require("@line/bot-sdk");

const db = require("../../services/db");

const router = express.Router();

router.post("/linewebhook", (req, res) => {
  const { events } = req.body;
  const lineuserid = events[0].source.userId;
  console.log(events[0]);
  console.log(lineuserid);

  //todooooo
  //เอาlineuseridไปเชคในตาราง prelinkline
  // ไม่มี ค่อยทำ

  res.send();
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
  const client = new line.Client({
    channelAccessToken:
      "thycWu8MBIKPETvBc3K77vJmvNVNJzIzRkq54WiezgKG7b4XFnANktSxSeSXUpsB4ZACjXZCJENtmlmKcAMqhoEzc04PiiqLTBk4rcr19cZa/SLzVh436CNYigDoEg5sp14MEIoP8IxkHmX1an6KwgdB04t89/1O/w1cDnyilFU=",
  });
  const message = {
    type: "text",
    text: text,
  };

  client
    .pushMessage(lineuserid, message)
    .then(() => {
      //   ...
    })
    .catch((err) => {
      // error handling
      console.log(err);
    });
  res.send();
});

module.exports = router;

//@336coaib
