import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";

import { Alert, Row, Col } from "react-bootstrap";

export const BotActiveStatus = ({ Bot_Type, botData, sym }) => {
  const [status, setStatus] = useState({});
  const [price, setPrice] = useState(undefined);
  const [pnl, setPnl] = useState(undefined);

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
    if (Bot_Type === "1" && status.last_history_Side === "SELL") {
      setPnl(
        ((status.curr_money - status.Initial_money) / status.Initial_money) *
          100
      );
    }
  }, [status]);
  useEffect(() => {
    if (Bot_Type === "1" && status.last_history_Side === "BUY") {
      setPnl(
        ((price * status.curr_coin - status.Initial_money) /
          status.Initial_money) *
          100
      );
    }
  }, [price]);

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
  function t_color(data) {
    if (data > 0) return "text-success";
    if (data < 0) return "text-danger";
  }
  return Bot_Type === "1" ? (
    //for Bot_Type Trade
    <Alert
    // variant={pnl > 0 ? "success" : pnl < 0 ? "danger" : "primary"}
    >
      {status.active ? (
        <>
          <h5>Active </h5>
          <span className="fw-bolder">Status : </span>
          {status.active}
          <Row>
            <Col className="d-flex flex-column flex-lg-row ">
              <div className="fw-bolder">Initial money&nbsp;</div>
              <div>{status.Initial_money.toFixed(2)} THB </div>
            </Col>
            {status.last_history_Side === "BUY" && (
              <>
                <Col className="d-flex flex-column flex-lg-row ">
                  <div className="fw-bolder">Balance&nbsp;</div>
                  <div
                  // className={`${t_color(
                  //   price * status.curr_coin - status.Initial_money
                  // )}`}
                  >
                    {price && status ? (
                      <>{(price * status.curr_coin).toFixed(2)} THB</>
                    ) : (
                      "Loading.."
                    )}
                  </div>
                </Col>
                <Col
                  xs={5}
                  sm={"auto"}
                  className="d-flex flex-column flex-lg-row "
                >
                  <div className="fw-bolder">Unrealized P/L&nbsp;</div>
                  <div className={`${t_color(pnl)}`}>
                    {(price * status.curr_coin - status.Initial_money).toFixed(
                      2
                    )}
                    ({pnl ? pnl.toFixed(2) : "Loading.."}%)
                  </div>
                </Col>
              </>
            )}
            {status.last_history_Side === "SELL" && (
              <>
                <Col className="d-flex flex-column flex-lg-row">
                  <div className="fw-bolder">Balance&nbsp;</div>
                  <div>
                    {status ? (
                      <>{status.curr_money.toFixed(2)} THB</>
                    ) : (
                      "Loading.."
                    )}
                  </div>
                </Col>
                <Col
                  xs={5}
                  sm={"auto"}
                  className="d-flex flex-column flex-lg-row"
                >
                  <div className="fw-bolder">realized P&L&nbsp;</div>
                  <div className={`${t_color(pnl)}`}>
                    {(status.curr_money - status.Initial_money).toFixed(2)}(
                    {pnl ? pnl.toFixed(2) : "Loading.."}%)
                  </div>
                </Col>
              </>
            )}
          </Row>
        </>
      ) : (
        <h5>Loading.. </h5>
      )}
    </Alert>
  ) : (
    // for Bot_Type Line
    <Alert variant="success">
      <h5>Active </h5>
    </Alert>
  );
};
