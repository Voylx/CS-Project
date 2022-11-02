import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";

import { Link, useNavigate } from "react-router-dom";
import { Container, Modal, Button, Alert } from "react-bootstrap";

import { useAuthen } from "../services/Authen";

import { Header } from "../components/Header";

export const LinkApiLine = () => {
  const [showModalLine, setshowModalLine] = useState(false);
  const handleClose = () => setshowModalLine(false);
  const handleShow = () => setshowModalLine(true);
  let navigate = useNavigate();
  const [isLinkLine, setIsLinkLine] = useState(undefined);

  function checkLinkAPI() {
    Axios.post("/api/check/link_line", {})
      .then((res) => {
        if (res.data.linkLine) {
          setIsLinkLine(true);
        } else {
          setIsLinkLine(false);
          navigate("/bot/linkline");
        }
      })
      .catch((err) => console.error(err?.response?.data));
  }

  function handleDisconnectLine() {
    Axios.post("/unlinkline", {})
      .then((res) => {
        if (res.data.status === "ok") {
          alert(res.data?.message);
          navigate("/bot/linkline");
        }
      })
      .catch((err) => console.error(err?.response?.data));
  }

  useEffect(() => {
    document.title = "Crypto-Bot : Line Settings";
    checkLinkAPI();
  }, []);

  return (
    <div>
      <Header />
      <Container fluid="md ">
        <div
          className="border p-3 mx-auto mt-5 col-lg-6 col-md-8 shadow-lg"
          style={{ borderRadius: "12px" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h2 className=" ">Line Connect</h2>
            <h6
              className="me-2 text-secondary c-grab"
              onClick={() => navigate("/bot")}
            >
              {"Go back"}
            </h6>
          </div>
          {isLinkLine && (
            <div>
              <div className="fs-4 mt-2">
                บัญชีของท่านได้ทำการเชื่อมต่อกับ Line เรียบร้อยแล้ว
              </div>
              <div></div>
              <Button
                variant="secondary"
                type="button"
                className="mt-3 mb-1 w-100"
                onClick={setshowModalLine}
              >
                ยกเลิกการเชื่อมต่อกับ Line
              </Button>
              <Button
                variant="primary"
                type="button"
                className="mt-1 mb-2 w-100"
                onClick={() => navigate(-1)}
              >
                ย้อนกลับ
              </Button>
            </div>
          )}
        </div>

        {/* ModalConfirmUnlinkLine */}

        <Modal show={showModalLine} onHide={handleClose} centered>
          <Modal.Header>
            <Modal.Title>Line Disconnect</Modal.Title>
          </Modal.Header>
          <Modal.Body>คุณต้องการที่จะยกเลิกการเชื่อมต่อใช่หรือไม่ </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              ย้อนกลับ
            </Button>
            <Button variant="primary" onClick={handleDisconnectLine}>
              ฉันต้องการที่จะยกเลิก
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};
