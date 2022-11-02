import React, { useState, useEffect } from "react";

import { Button, Modal, Container, Row, Col } from "react-bootstrap";

import { useAuthen } from "../services/Authen";

import { Header } from "../components/Header";
import { BotBox } from "../components/BotPage/BotBox";

export const BotPage = () => {
  const isAuthen = useAuthen();

  useEffect(() => {
    document.title = "Crypto-Bot : Bots ";
  }, []);

  return (
    <div>
      <Header />
      <Container className=" mt-5 ">
        <h1 className="display-1 text-center fw-bold h-text-primary">
          Crypto-Bot
        </h1>

        {isAuthen && (
          <div className="  mt-5  rounded">
            <h3 className=" mt-5 mb-4">Choose Bot</h3>
            <Row className="justify-content-around ">
              <BotBox type={1} />
              <BotBox type={0} />
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
};
