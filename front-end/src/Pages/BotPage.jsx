import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";

import { useNavigate } from "react-router-dom";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";

import { useAuthen } from "../services/Authen";

import { Header } from "../components/Header";

import add from "../icons/add.png";

const AddBox = (props) => {
  const { type, title } = props;
  let navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const linkbotapi = {
    0: () => navigate("../linkline"),
    1: () => navigate("../bitkub"),
  };

  const handleAddBot = () => {
    Axios.post("/bot/add", {
      Type: type,
    })
      .then((res) => {
        if (res.data.status === "ok") linkbotapi[type]();
      })
      .catch((err) => console.error(err.response.data));
  };

  return (
    <>
      <div
        className="bg-secondary mx-2 p-2 rounded  d-flex justify-content-center align-items-center"
        style={{ height: "10rem" }}
        // onClick={linkbotapi[type]}
        onClick={() => {
          setShowModal(true);
        }}
      >
        <img src={add} alt="add" height={"50rem"} className="" />
        {/* <AddBoxModal show={showModal} setShow={setShowModal} /> */}
      </div>
      {/* Modal popup confirmed create Bot */}
      <>
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add {title[type]}</Modal.Title>
          </Modal.Header>
          {/* <Modal.Body>Are you sure you want to log out? </Modal.Body> */}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddBot}>
              Confirmed
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
};

const Box = (props) => {
  const { botData } = props;
  let navigate = useNavigate();

  return (
    <div
      className="bg-secondary mx-2 p-2 rounded  d-flex justify-content-center align-items-center"
      style={{ height: "10rem" }}
      onClick={() => {
        navigate(`../${botData.Bot_id}`);
      }}
    >
      {botData.Bot_id}
    </div>
  );
};

export const BotBox = (props) => {
  const { type } = props;
  const title = { 0: "Bot Line-Notification", 1: "Bot Trade" };
  const [botData, setBotData] = useState("undefined");
  useEffect(() => {
    Checkbot(type);
  }, []);

  function Checkbot(Type) {
    Axios.post("/bot/checkbot", { Type })
      .then((res) => {
        console.log(res.data);
        setBotData(res.data.bot);
      })
      .catch((err) => {
        console.error(err.response.data);
      });
  }

  return (
    <Col md={5} className="bg-light m-2 p-2 pb-3  rounded">
      <h3>{title[type]}</h3>

      {botData ? (
        <Box botData={botData} />
      ) : (
        <AddBox {...props} title={title} />
      )}
    </Col>
  );
};

export const BotPage = () => {
  const isAuthen = useAuthen();

  return (
    <div>
      <Header />
      <Container>
        <h1 className="display-1 text-center fw-bold">Crypto-Bot</h1>

        {isAuthen && (
          <div>
            <h3>Choose Bot</h3>
            <Row className="justify-content-around">
              <BotBox type={1} />
              <BotBox type={0} />
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
};
