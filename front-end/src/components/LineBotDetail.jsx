import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";

import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";

import { useAuthen } from "../services/Authen";

import { Header } from "../components/Header";

export const LineBotDetail = () => {
  let navigate = useNavigate();
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
            <div className="fs-2">QR-Code</div>
            <div
              className="h-auto  mx-auto mt-2 shadow-lg"
              style={{ borderRadius: "11px", height: "10rem" }}
            >
              รูป QR-Code eiei
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
