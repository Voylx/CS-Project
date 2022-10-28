import React, { useState } from "react";
import { Button, Modal, Nav } from "react-bootstrap";

// const handleLogout = () => {
//   localStorage.clear();
//   window.location = "/";
// };

export const ModalLine = () => {
  const [show, setShow] = useState(false);
  const [textColor, setTextColor] = useState("text-white");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Nav.Link
        // href="#link"
        className={textColor}
        onClick={handleShow}
        onMouseEnter={() => setTextColor("text-primary")}
        onMouseLeave={() => setTextColor("text-white")}
      >
        Logout
      </Nav.Link>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Line Connect</Modal.Title>
        </Modal.Header>
        <Modal.Body>คุณต้องการที่จะยกเลิกการเชื่อมต่อใช่หรือไม่ </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ย้อนกลับ
          </Button>
          <Button variant="primary" onClick={handleClose}>
            ฉันต้องการที่จะยกเลิก
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
