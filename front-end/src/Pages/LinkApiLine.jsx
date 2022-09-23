import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import { Header } from "../components/Header";

export const LinkApiLine = () => {
  let navigate = useNavigate();
  return (
    <div>
      <Header />
      <div>LinkApiLinelBotยังไม่ได้ทำไรเลย</div>
      <Button
        onClick={() => {
          navigate(`../linkline`);
        }}
      >
        Control
      </Button>
    </div>
  );
};
