import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import SelectStrategies from "./SelectStrategies";
import RealtimeBoxGroup from "./RealtimeBoxGroup";

export const TradeBotDetail = (props) => {
  let navigate = useNavigate();

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
        <RealtimeBoxGroup />
        <div className="linetext mb-5 text-muted"></div>
        <SelectStrategies {...props} />
        <div style={{ height: "10rem" }}>.</div>
      </Container>
    </>
  );
};
