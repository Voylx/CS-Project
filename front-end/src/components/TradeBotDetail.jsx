import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";
import { useNavigate } from "react-router-dom";

import { Button, Container, Form, Row, Col } from "react-bootstrap";

export const TradeBotDetail = () => {
  let navigate = useNavigate();
  const [symbols, setSymbols] = useState([]);
  const [strategies, setStrategies] = useState([]);
  const [symbol, setSymbol] = useState("default");
  const [strategy, setStrategy] = useState("default");

  function checkLinkAPI() {
    Axios.post("/api/check/link_apibitkub", {})
      .then((res) => {
        // console.log(res.data);
        if (!res.data.linkAPI) {
          navigate("/bot/bitkub");
        }
      })
      .catch((err) => console.error(err?.response?.data));
  }
  function getsymbols() {
    Axios.get("/symbols")
      .then((res) => {
        setSymbols(res.data.symbols);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getstrategies() {
    Axios.get("/strategies")
      .then((res) => {
        setStrategies(res.data.strategies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    checkLinkAPI();
    getsymbols();
    getstrategies();
  }, []);

  return (
    <>
      <Container>
        <Row className="m-4 g-3 ">
          <h2 className="ms-7 ">Viewer Trade</h2>
        </Row>
        <Row
          className="m-4 g-2 "
          xs={3}
          lg={3}
          xl={4}
          onClick={() => navigate("/bot/viewertrade")}
        >
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21,
          ].map((i) => {
            return (
              <Col>
                <div
                  className="border rounded-3 shadow p-3 "
                  style={
                    {
                      // height: "7rem",
                    }
                  }
                >
                  <h5 className="m-0">BTC</h5>
                  <h6 className="m-0 fs-6 text-primary">728,695.47</h6>
                  {i % 2 == 0 ? (
                    <p className="m-0 fs-6 text-success">(1.33%)</p>
                  ) : (
                    <p className="m-0 fs-6 text-danger">(-1.33%)</p>
                  )}

                  {/* <h6 className="m-0 text-primary">BTC</h6> */}
                </div>
              </Col>
            );
          })}
        </Row>
        <div className="linetext mb-5 text-muted"></div>
        <div className="border rounded-3 p-3 mb-5 mx-auto mt-5  shadow-lg col-lg-10 ">
          <Row>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="ms-7 ">Strategy bot</h2>
              <h6 className="me-2 text-secondary" onClick={() => navigate(-1)}>
                {"Go back"}
              </h6>
            </div>
            {/* select Strategy */}
            <Col className="mb-3" lg={5}>
              <Form.Label>Select Strategy</Form.Label>
              <Form.Select
                aria-label="Select Strategy"
                onChange={(e) => {
                  setStrategy(e.target.value);
                }}
              >
                <option value="default" className="text-muted">
                  [All]
                </option>

                {Object.entries(strategies).map(([k, v]) => (
                  <option value={k} key={k}>
                    {v}
                  </option>
                ))}
              </Form.Select>
            </Col>

            {/* select Coin */}
            <Col className="mb-3" lg={5}>
              <Form.Label>Select Coin</Form.Label>
              <Form.Select
                aria-label="select coin"
                onChange={(e) => {
                  setSymbol(e.target.value);
                }}
                value={symbol}
              >
                <option value="default" className="text-muted" disabled>
                  Select Coin
                </option>

                {symbols.map((v) => (
                  <option value={v} key={v}>
                    {v}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col className="mb-3  align-self-end " lg={2}>
              <Button className="w-100 ">Filter...</Button>
            </Col>
          </Row>
        </div>

        {/* sym:{symbol}
        <br />
        strategy:{strategies[strategy]} */}
        <Row className="g-3" xs={2} lg={3} xl={4}>
          {[1, 2, 3, 4, 5, 6, 7].map((i) => {
            return (
              <Col>
                <div
                  className="border rounded-3 shadow p-2 mb-1"
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
      </Container>
    </>
  );
};
