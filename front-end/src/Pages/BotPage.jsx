import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";

import { useNavigate } from "react-router-dom";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";

import { useAuthen } from "../services/Authen";

import { Header } from "../components/Header";

import add from "../icons/add.png";
import settingpic from "../icons/settings.png";

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
    Axios.post("/api/addbot", {
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
        className=" bg-secondary mx-2 p-2 rounded  d-flex justify-content-center align-items-center"
        style={{ height: "10rem" }}
        // onClick={linkbotapi[type]}
        onClick={handleShow}
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
  const { botData, type } = props;
  let navigate = useNavigate();

  const linksetting = {
    0: () => navigate("../linkapiline"),
    1: () => navigate("../bitkubupdate"),
  };

  return (
    <div className="bg-secondary mx-2 p-2 rounded " style={{ height: "7rem" }}>
      <img
        src={settingpic}
        alt="setting"
        height={"22rem"}
        className="float-end"
        onClick={linksetting[type]}
      />
      <div className=" d-flex flex-column p-3 justify-content-around align-items-center">
        {botData.Bot_id}
        <Button
          onClick={() => {
            navigate(`../${type}`);
          }}
        >
          Control
        </Button>
      </div>
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
    Axios.post("/api/check/havebot", { Type })
      .then((res) => {
        console.log(res.data);
        setBotData(res.data.bot);
        localStorage.setItem(`botData${Type}`, JSON.stringify(res.data.bot));
      })
      .catch((err) => {
        console.error(err.response.data);
      });
  }

  return (
    <Col md={5} className="bg-lightgray2 m-2 p-2 pb-3  rounded">
      <h3>{title[type]}</h3>

      {botData ? (
        <Box {...props} botData={botData} />
      ) : (
        <AddBox {...props} title={title} />
      )}
    </Col>
  );
};

export const BotPage = () => {
  const isAuthen = useAuthen();

  useEffect(() => {
    document.title = "Crypto-Bot : Bots ";
  }, []);

  return (
    <div>
      <Header />
      <Container className=" mt-5">
        <h1 className="display-1 text-center fw-bold">Crypto-Bot</h1>

        {isAuthen && (
          <div className="  mt-5  rounded">
            <h3 className=" mt-5 mb-3">Choose Bot</h3>
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
