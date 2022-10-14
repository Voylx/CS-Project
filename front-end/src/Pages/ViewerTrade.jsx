import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthen } from "../services/Authen";
import { Button, Container, Form, Row, Col } from "react-bootstrap";

import { Header } from "../components/Header";

import "https://s3.tradingview.com/tv.js";

export const ViewerTrade = () => {
  const isAuthen = useAuthen();
  let navigate = useNavigate();
  let params = useParams();

  const symbol = params.symbol;

  useEffect(() => {
    new TradingView.widget({
      // autosize: true,
      width: "100%",
      symbol: `BITKUB:${symbol}THB`,
      interval: "D",
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      withdateranges: true,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      container_id: "tradingview_3c6e1",
    });
  }, []);

  return (
    <div>
      <Header />
      <div
        className="border p-3 mx-auto mt-5 col-lg-10 col-md-9 col-sm-9 shadow-lg"
        style={{ borderRadius: "8px" }}
      >
        <div className="d-flex justify-content-between ">
          <h2 className="ms-7">Trading View</h2>
          <h6 className="me-2 text-secondary" onClick={() => navigate(-1)}>
            {"Go back"}
          </h6>
        </div>
        <div className="mb-5 ">
          <div className="fs-1">{symbol}</div>

          <>
            {/* TradingView Widget BEGIN */}
            <div className="tradingview-widget-container">
              <div id="tradingview_3c6e1" />
              <div className="tradingview-widget-copyright">
                <a
                  href={`https://www.tradingview.com/symbols/${symbol}THB/?exchange=BITKUB`}
                  rel="noopener"
                  target="_blank"
                >
                  <span className="blue-text">{symbol} Chart</span>
                </a>{" "}
                by TradingView
              </div>
            </div>
            {/* TradingView Widget END */}
          </>
        </div>
        <div className="linetext mb-4 text-muted">&ensp;Strategy&ensp;</div>
        <Row className="g-3" xs={2} lg={3} xl={4}>
          {[1, 2, 3, 4].map((i) => {
            return (
              <Col key={i}>
                <div
                  className="border rounded-3 shadow p-2"
                  style={
                    {
                      // height: "7rem",
                    }
                  }
                >
                  <h6 className="m-0">CDC-TF1D</h6>
                  <h6 className="m-0 text-primary">BTC</h6>
                  {i % 2 == 0 ? (
                    <p className="m-0 fs-6 text-success">BUY</p>
                  ) : (
                    <p className="m-0 fs-6 text-danger">SELL</p>
                  )}
                  <p className="m-0 fs-6 text-muted">2022-09-05 : 22:43:00</p>
                  <p className="m-0 fs-6 text-muted">(3 days ago) </p>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};
