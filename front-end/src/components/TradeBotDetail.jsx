import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Row, Col } from "react-bootstrap";

import SelectStrategies from "./SelectStrategies";

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
  useEffect(() => {
    checkLinkAPI();
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
              <Col key={i}>
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
        <SelectStrategies />
      </Container>
    </>
  );
};
