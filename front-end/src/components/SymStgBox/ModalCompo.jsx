import React, { useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import { ModalConfrim } from "./ModalConfrim";
const ModaldalCompo = ({ show, handleClose, sym, stg }) => {
  // const handleConfirm = () => setConfrim();
  const [showModalCon, setShowModalCon] = useState(false);
  const handleModalShowCon = () => setShowModalCon(true);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Bot Trade Cryptocurrency</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p className="fs-3 ms-7 ">{stg}</p>
          <p className="fs-6 ms-7 ">{sym}</p>
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
        <Button variant="primary" onClick={setShowModalCon}>
          Save Changes
        </Button>
      </Modal.Footer>
      <ModalConfrim show={showModalCon} handleClose={handleClose} />
    </Modal>
  );
};

export default ModaldalCompo;
