import React, { useState } from "react";
import Axios from "../../services/Axios";
import { Button, Modal, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ModalConfrim = ({
  show,
  handleClose,
  sym,
  stg,
  amt,
  botData,
  stgID,
  setSelected,
  reload,
  getAvailableBalance,
}) => {
  let navigate = useNavigate();
  const [textColor, setTextColor] = useState("text-white");

  function addSelected() {
    Axios.post("/api/addselected", {
      Bot_id: botData.Bot_id,
      Sym: sym,
      Strategy_Id: stgID,
      Amt_money: amt,
    })
      .then((res) => {
        if (res.data.status === "success") {
          if (setSelected !== undefined) setSelected(true);
          if (reload) navigate(0);
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err?.response?.data?.message);
      })
      .finally(() => {
        handleClose();
        getAvailableBalance();
      });
  }

  // const handleShow = () => setShow(true);
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confrim </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>
              {/* Are you sure you to change this?
              ต้องการจะเปลี่ยนเงินที่บอทควบคุมใช่หรือไม่ */}
              ต้องการที่จะเปิดการเทรดเหรียญ{" "}
              <b className="text-primary">{sym}</b> <br />
              ด้วยกับ กลยุทธ์ <b className="text-primary">{stg}</b> <br />
              จำนวนเงินในการเรี่มต้นเทรด <b className="text-primary">
                {amt}
              </b> ฿ <br />
              ใช่หรือไม่
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addSelected}>
            Confrim
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
