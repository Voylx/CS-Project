import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

import RealtimeBoxGroup from "./RealtimeBoxGroup";
import SelectStrategies from "./SelectStrategies";
import { useAuthen } from "../services/Authen";

export const LineBotDetail = (props) => {
  let navigate = useNavigate();
  async function checkLinkAPI() {
    try {
      const res = await Axios.post("/api/check/link_line", {});

      // console.log(res.data);
      if (!res.data.linkLine) {
        navigate("/bot/linkline");
      }
    } catch (error) {
      console.error(error?.response?.data);
    }
  }

  useEffect(() => {
    checkLinkAPI();
  }, []);

  return (
    <div>
      <Container>
        <Row className="m-4 g-3 ">
          <div className=" d-flex  align-items-center">
            <h1>Viewer Trade</h1>
            <h6>(Line Notification)</h6>
          </div>
        </Row>
        <RealtimeBoxGroup {...props} />
        <div className="linetext mb-5 text-muted"></div>
        <SelectStrategies {...props} />
        <div style={{ height: "10rem" }}>.</div>
      </Container>
    </div>
  );
};
