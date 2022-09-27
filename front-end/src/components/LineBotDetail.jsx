import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";

import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";

export const LineBotDetail = () => {
  let navigate = useNavigate();
  function checkLinkAPI() {
    Axios.post("/api/check/link_line", {})
      .then((res) => {
        console.log(res.data);
        if (!res.data.linkLine) {
          navigate("/bot/linkline");
        }
      })
      .catch((err) => console.error(err?.response?.data));
  }

  useEffect(() => {
    checkLinkAPI();
  }, []);

  return (
    <div>
      <Container fluid="md">
        <div
          className="border p-3 mx-auto mt-5 col-lg-6 col-md-8 shadow-lg"
          style={{ borderRadius: "11px" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="ms-7">Line Notification</h2>
            <h6
              className="me-2 text-secondary"
              onClick={() => navigate("/bot")}
            >
              {"Go back"}
            </h6>
          </div>
          <div className="mb-5 text-center">
            <div className="fs-3">หน้าเชื่อมแล้ว</div>
            <div
              className=" fs-2 mx-auto mt-2 shadow-lg "
              // style={{ borderRadius: "11px", height: "10rem" }}
            >
              random
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
