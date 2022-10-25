import React, { useState, useEffect } from "react";
import Axios from "../../services/Axios";
import { Container, Form, Button, Modal } from "react-bootstrap";
import { ModalConfrim } from "./ModalConfrim";
const ModalSelected = ({ show, handleClose, sym, stg, balances, ...props }) => {
  // const handleConfirm = () => setConfrim();
  const [showModalCon, setShowModalCon] = useState(false);

  const [amt, setAmt] = useState();
  const [textErr, settextErr] = useState("");

  useEffect(() => {
    if (amt < 50) settextErr("❌จำนวนเงินน้อยเกินไป");
    else if (amt >= 50) settextErr("");
    if (amt > balances?.available) {
      console.log(">");
      settextErr("❌จำนวนเงินมากกว่าจำนวนเงินที่ใช้ได้");
    }
  }, [amt]);

  return (
    <Modal show={show} onHide={handleClose} className={sym + stg}>
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
            type="number"
            placeholder="1000"
            min={50}
            onChange={(event) => {
              setAmt(+event.target.value);
            }}
          />
          {textErr && <p className="my-1 text-danger">{textErr}</p>}
        </Form.Group>
        <div>
          <div className="d-flex">
            <p className="fw-bold">จำนวนเงินทั้งหมดที่มี : </p>
            <p className="ms-1"> {balances?.all?.toFixed(2)} baht</p>
          </div>
          <div className="d-flex">
            <p className="fw-bold">จำนวนเงินที่บอทใช้ : </p>
            <p className="ms-1"> {balances?.waitOrder?.toFixed(2)} baht</p>
          </div>
          <div className="d-flex">
            <p className="fw-bold">จำนวนเงินที่ใช้ได้ : </p>
            <p className="ms-1"> {balances?.available?.toFixed(2)} baht</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={setShowModalCon}
          disabled={!amt || amt < 50 || amt > balances?.available}
        >
          Save Changes
        </Button>
      </Modal.Footer>
      <ModalConfrim
        show={showModalCon}
        handleClose={handleClose}
        sym={sym}
        stg={stg}
        amt={amt}
        {...props}
      />
    </Modal>
  );
};

export default ModalSelected;
