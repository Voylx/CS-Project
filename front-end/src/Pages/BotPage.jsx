import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

import { useAuthen } from "../components/Authen";

import { Header } from "../components/Header";

import add from "../icons/add.png";

const AddBox = () => {
  return (
    <div
      className="bg-secondary mx-2 p-2 rounded  d-flex justify-content-center align-items-center"
      style={{ height: "10rem" }}
      onClick={() => console.log("Click")}
    >
      <img src={add} alt="add" height={"50rem"} className="" />
    </div>
  );
};

export const BotPage = () => {
  const isAuthen = useAuthen();

  return (
    <div>
      <Header />
      <Container>
        <h1 className="display-1 text-center fw-bold">Cryto-Bot</h1>

        {isAuthen && (
          <div>
            <h3>Choose Bot</h3>
            <Row className="justify-content-around">
              <Col md={5} className="bg-light m-2 p-2 pb-3  rounded">
                <h3>Bot Trade</h3>
                <AddBox />
              </Col>
              <Col md={5} className="bg-light m-2 p-2 pb-3  rounded">
                <h3>Bot Line Notification</h3>
                <AddBox />
              </Col>
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
};
