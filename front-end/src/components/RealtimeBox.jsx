import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Col, Row } from "react-bootstrap";

const RealtimeBox = ({ sym, data, botData }) => {
  let navigate = useNavigate();
  const [price, setPrice] = useState(data.last);
  const [change, setChange] = useState(data.percentChange);
  const [color, setColor] = useState(false);

  useEffect(() => {
    // console.log(sym, price);
    setColor(true);
    setTimeout(() => {
      setColor(false);
    }, 500);
  }, [price]);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://api.bitkub.com/websocket-api/market.ticker.thb_${sym}`
    );

    ws.onopen = () => {
      console.log("open");
    };
    ws.onclose = () => {
      console.log("close");
    };
    ws.onmessage = function (event) {
      try {
        const ws_data = JSON.parse(event.data);
        if (ws_data.last !== price) {
          // console.log(ws_data.stream.substring(18), ws_data.last, price);
          setPrice(ws_data.last);
          setChange(ws_data.percentChange);
        }
      } catch (err) {
        console.log({ error: err.message });
      }
    };
    return () => {
      if (ws.readyState === 1) {
        ws.close();
        console.log("then");
      }
    };
  }, []);

  function numFormat(num) {
    return new Intl.NumberFormat().format(num);
  }

  return (
    <Col
      className="h-bg-primary-2 c-grab"
      onClick={() => navigate(`/bot/${botData.Type}/viewertrade/${sym}`)}
    >
      <div
        className={`border rounded-3 shadow p-3  ${
          color ? "bg-purlight" : ""
        } `}
        style={
          {
            // height: "7rem",
          }
        }
      >
        <Row>
          <h5 className="m-0 col col-xl-12 ">{sym}</h5>
          <h6 className="m-0 fs-6 text-primary col col-xl-12">
            {numFormat(price)}
          </h6>

          {change >= 0 ? (
            <p className="m-0 fs-6 col col-xl-12 text-success">({change}%) ↑</p>
          ) : (
            <p className="m-0 fs-6 col col-xl-12 text-danger">({change}%) ↓</p>
          )}
        </Row>
      </div>
    </Col>
  );
};

export default RealtimeBox;
