import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";

import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Modal } from "react-bootstrap";

import { useAuthen } from "../services/Authen";

import { Header } from "../components/Header";
import ModalCompo from "../components/ModalCompo";

export const BotContorl = () => {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const isAuthen = useAuthen();

  return (
    <div>
      <Header />
      <Container fluid="md">
        <>
          <Button variant="primary" onClick={handleShow}>
            Launch demo modal
          </Button>
          <ModalCompo show={show} handleClose={handleClose} />

          {/* <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Bot Trade Cryptocurrency</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <p className="fs-3 ms-7 ">Stg</p>
                <p className="fs-6 ms-7 ">Sym</p>
              </div>
              <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label>โปรดใส่จำนวนเงินที่ต้องการให้บอทคุม</Form.Label>
                <Form.Control
                  type="sad"
                  placeholder="1000"
                  // onChange={(event) => {
                  //   setEmail(event.target.value);
                  // }}
                />
              </Form.Group>
              <div>
                <div className="d-flex">
                  <p className="fw-bold">จำนวนเงินทั้งหมดที่มี : </p>
                  <p>1000 baht</p>
                </div>
                <div className="d-flex">
                  <p className="fw-bold">จำนวนเงินที่บอทใช้ : </p>
                  <p>600 baht</p>
                </div>
                <div className="d-flex">
                  <p className="fw-bold">จำนวนเงินที่ใช้ได้ : </p>
                  <p>400 baht</p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal> */}
        </>
      </Container>
    </div>
  );
};
