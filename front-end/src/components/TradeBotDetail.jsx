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
        <div className="border rounded-3 p-3 mx-auto mt-5  shadow-lg col-lg-10 ">
          {/* {symbols} */}
          <Row>
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

            <Col className="mb-3 align-self-end " lg={2}>
              <Button className="w-100 ">Something...</Button>
            </Col>
          </Row>
        </div>
        sym:{symbol}
        <br />
        strategy:{strategies[strategy]}
      </Container>
    </>
  );
};
