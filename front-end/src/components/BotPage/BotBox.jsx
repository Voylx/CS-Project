import React, { useState, useEffect } from "react";

import Axios from "../../services/Axios";

import { Col } from "react-bootstrap";

import { AddBox } from "./AddBox";
import { Box } from "./Box";

export const BotBox = (props) => {
  const { type } = props;
  const title = { 0: "Bot Line-Notification", 1: "Bot Trade" };
  const [botData, setBotData] = useState("undefined");
  useEffect(() => {
    Checkbot(type);
  }, []);

  function Checkbot(Type) {
    Axios.post("/api/check/havebot", { Type })
      .then((res) => {
        console.log(res.data);
        setBotData(res.data.bot);
        localStorage.setItem(`botData${Type}`, JSON.stringify(res.data.bot));
      })
      .catch((err) => {
        console.error(err.response.data);
      });
  }

  return (
    <Col md={5} className="bg-lightgray2 m-2 p-2 pb-3  rounded ">
      <h3>{title[type]}</h3>

      {botData ? (
        <Box {...props} botData={botData} />
      ) : (
        <AddBox {...props} title={title} />
      )}
    </Col>
  );
};
