import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";

import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { useAuthen } from "../services/Authen";

import { Header } from "../components/Header";
export const LinkLine = () => {
  let navigate = useNavigate();
  const isAuthen = useAuthen();
  const [randNum, setRandNum] = useState();

  function checkLinkAPI() {
    Axios.post("/api/check/link_line", {})
      .then((res) => {
        if (res.data.linkLine) {
          navigate(-1);
        } else getprelinkline();
      })
      .catch((err) => console.error(err?.response?.data));
  }
  function getprelinkline() {
    Axios.post("/get_prelinkline", {})
      .then((res) => {
        console.log(res.data);
        if (!res.data.data) {
          addPreLinkLine();
        } else {
          setRandNum(res.data.data.rand_num);
          console.log(res.data.data.rand_num);
        }
      })
      .catch((err) => console.error(err?.response?.data));
  }
  function addPreLinkLine() {
    Axios.post("prelinkline", {})
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => console.error(err?.response?.data));
  }

  useEffect(() => {
    document.title = "Crypto-Bot : Line Connect";
    checkLinkAPI();
  }, []);

  return (
    <div>
      <Header />
      <Container fluid="md">
        <div
          className="border p-3 mx-auto mt-5 col-lg-8 col-md-8 shadow-lg"
          style={{ borderRadius: "11px" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="ms-7">Line Notification</h2>
            <h6
              className="me-2 text-secondary c-grab"
              onClick={() => navigate("/bot")}
            >
              {"Go back"}
            </h6>
          </div>
          <div>
            <div className="fs-4 mt-2">วิธีเชื่อมต่อกับ Line</div>{" "}
            <div>1. แอดไลน์ที่ : @336coaib หรือ QR-Code</div>
            <div className="text-center">
              <img src="https://qr-official.line.me/sid/M/336coaib.png?shortenUrl=true" />
            </div>
            <div>2. พิมพ์รหัสด้านล่างนี้ ส่งไปในไลน์</div>
            <Row className="mt-3 ">
              <Col md={6} lg={4} className="bg-light  p-2 mx-auto text-center">
                <h4>{randNum}</h4>
              </Col>
            </Row>
            <Button
              variant="primary"
              type="button"
              className="mt-3 mb-2 w-100"
              onClick={() => navigate(0)}
            >
              เสร็จสิ้น
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
