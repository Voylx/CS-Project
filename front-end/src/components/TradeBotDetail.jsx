import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Row, Col } from "react-bootstrap";

import SelectStrategies from "./SelectStrategies";

export const TradeBotDetail = (props) => {
  let navigate = useNavigate();
  const [symbols, setSymbols] = useState([]);
  const [strategies, setStrategies] = useState({});
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
  useEffect(() => {
    checkLinkAPI();
    getsymbols();
  }, []);

  return (
    <>
      <Container>
        <Row className="m-4 g-3 ">
          <h2 className="ms-7 ">Viewer Trade</h2>
        </Row>
        <Row className="m-4 g-2 " xs={3} lg={3} xl={4}>
          {symbols.map((v, i) => {
            return (
              <Col key={i} onClick={() => navigate(`/bot/viewertrade/${v}`)}>
                <div
                  className="border rounded-3 shadow p-3 "
                  style={
                    {
                      // height: "7rem",
                    }
                  }
                >
                  <h5 className="m-0">{v}</h5>
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
        <SelectStrategies {...props} />
        <div style={{ height: "10rem" }}>.</div>
      </Container>
    </>
  );
};
