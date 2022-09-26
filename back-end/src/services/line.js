"use strict";
const line = require("@line/bot-sdk");

const Line = {
  client: new line.Client({
    channelAccessToken:
      "thycWu8MBIKPETvBc3K77vJmvNVNJzIzRkq54WiezgKG7b4XFnANktSxSeSXUpsB4ZACjXZCJENtmlmKcAMqhoEzc04PiiqLTBk4rcr19cZa/SLzVh436CNYigDoEg5sp14MEIoP8IxkHmX1an6KwgdB04t89/1O/w1cDnyilFU=",
  }),
  message: {
    type: "text",
    text: "Hello, world!",
  },
  reply(replyToken, text) {
    this.message.text = text;
    this.client
      .replyMessage(replyToken, this.message)
      .then(() => {
        // ...
      })
      .catch((err) => {
        // error handling
        console.log(err);
        throw err;
      });
  },
  push(lineuserid, text) {
    let ret;
    this.message.text = text;
    this.client
      .pushMessage(lineuserid, this.message)
      .then(() => {
        //..
      })
      .catch((err) => {
        // error handling
        console.log(err);
        throw err;
      });
  },
};

module.exports = Line;
