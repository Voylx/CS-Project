import React, { useState, useEffect } from "react";

import Axios from "../../services/Axios";

import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

import add from "../../icons/add.png";

export const AddBox = (props) => {
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
      <di
        className="c-grab h-bg-primary bg-secondary mx-2 p-2 rounded  d-flex justify-content-center align-items-center"
        style={{ height: "10rem" }}
        // onClick={linkbotapi[type]}
        onClick={handleShow}
      >
        <img src={add} alt="add" height={"50rem"} className="" />
        {/* <AddBoxModal show={showModal} setShow={setShowModal} /> */}
      </di>
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
