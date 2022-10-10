import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Col } from "react-bootstrap";

const RealtimeBox = ({ sym, data }) => {
  let navigate = useNavigate();
  const [price, setPrice] = useState(data.last);
  const [change, setChange] = useState(data.percentChange);

  const [color, setColor] = useState(false);

  const ws = new WebSocket(
    `wss://api.bitkub.com/websocket-api/market.ticker.thb_${sym}`
  );

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

  useEffect(() => {
    console.log(sym, price);
    setColor(true);
    setTimeout(() => {
      setColor(false);
    }, 500);
  }, [price]);

  return (
    <Col onClick={() => navigate(`/bot/viewertrade/${sym}`)}>
      <div
        className={`border rounded-3 shadow p-3 ${color ? "bg-success" : ""}`}
        style={
          {
            // height: "7rem",
          }
        }
      >
        <h5 className="m-0">{sym}</h5>
        <h6 className="m-0 fs-6 text-primary">{price}</h6>

        <p
          className={`m-0 fs-6 ${change >= 0 ? "text-success" : "text-danger"}`}
        >
          ({change}%)
        </p>
      </div>
    </Col>
  );
};

export default RealtimeBox;
