import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";

import { Alert, Row, Col } from "react-bootstrap";

export const BotActiveStatus = ({ Bot_Type, botData, sym }) => {
  const [status, setStatus] = useState({});
  const [price, setPrice] = useState(undefined);

  useEffect(() => {
    if (Bot_Type === "1") {
      getBotStatus();
      if (status.last_history_Side === "BUY") {
        gettickers();
      }
    }
  }, []);
  useEffect(() => {
    if (Bot_Type === "1" && status.last_history_Side === "BUY") {
      gettickers();
    }
  }, [status]);

  async function getBotStatus() {
    try {
      const response = await Axios.post(`/api/getbotstatus`, {
        Bot_id: botData.Bot_id,
        Sym: sym,
      });
      const data = response.data;
      setStatus(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  function gettickers() {
    Axios.get(`/api/tickers?sym=${sym}`)
      .then((res) => {
        setPrice(res.data.data.last);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return Bot_Type === "1" ? (
    //for Bot_Type Trade
    <Alert variant="primary">
      {status.active && (
        <>
          <h5>Active </h5>
          Status : {status.active}
          {status.last_history_Side === "BUY" && (
            <Row>
              <Col>Initial_money : {status.Initial_money.toFixed(2)}</Col>
              <Col>Value Now : {(price * status.curr_coin).toFixed(2)}</Col>
              <Col>
                Unrealized P&L :{" "}
                {(
                  ((price * status.curr_coin - status.Initial_money) /
                    status.Initial_money) *
                  100
                ).toFixed(2)}{" "}
                %
              </Col>
            </Row>
          )}
          {status.last_history_Side === "SELL" && (
            <Row>
              <Col>Initial_money : {status.Initial_money}</Col>
              <Col>Value Now : {status.curr_money}</Col>
              <Col>
                realized P&L :{" "}
                {(
                  ((status.curr_money - status.Initial_money) /
                    status.Initial_money) *
                  100
                ).toFixed(2)}{" "}
                %
              </Col>
            </Row>
          )}
        </>
      )}
    </Alert>
  ) : (
    // for Bot_Type Line
    <Alert variant="success">
      <h5>Active </h5>
    </Alert>
  );
};
