import React, { useState } from "react";
import { Button, Modal, Nav } from "react-bootstrap";

export const ModalConfrim = ({ show, handleClose }) => {
  const [textColor, setTextColor] = useState("text-white");

  // const handleShow = () => setShow(true);
  return (
    <>
      <Nav.Link
        // href="#link"
        className={textColor}
        // onClick={handleShow}
        onMouseEnter={() => setTextColor("text-primary")}
        onMouseLeave={() => setTextColor("text-white")}
      >
        Logout
      </Nav.Link>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confrim change</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Are you sure you to change this?</p>
            <p>ต้องการจะเปลี่ยนเงินที่บอทควบคุมใช่หรือไม่</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Confrim
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
