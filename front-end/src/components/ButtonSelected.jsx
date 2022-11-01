import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import ModalSelected from "./SymStgBox/ModalSelected";

export const ButtonSelected = ({
  Bot_Type,
  sym,
  stgID,
  selected,
  ...props
}) => {
  let navigate = useNavigate();
  const botData = JSON.parse(localStorage.getItem(`botData${Bot_Type}`));
  const [disableAddDelSelected, setDisableAddDelSelected] = useState(true);
  const [textSelected, setTextSelected] = useState("ปิดการทำงานกลยุทธ์นี้");

  const [fAction, setFAction] = useState("non");

  const [balance, setBalance] = useState({});
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  function addSelected() {
    Axios.post("/api/addselected", {
      Bot_id: botData.Bot_id,
      Sym: sym,
      Strategy_Id: stgID,
    })
      .then((res) => {
        if (res.data.status === "success") {
          navigate(0);
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err?.response?.data?.message);
      });
  }

  function delSelected() {
    Axios.post("/api/delselected", {
      Bot_id: botData.Bot_id,
      Sym: sym,
      Strategy_Id: stgID,
    })
      .then((res) => {
        if (res.data.status === "success") {
          navigate(0);
        }
      })
      .catch((err) => console.error(err));
  }
  function getAvailableBalance() {
    Axios.post("/api/available_balance", {
      Bot_id: botData.Bot_id,
    })
      .then((balance) => {
        // console.log(balance.data);
        setBalance(balance.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const fOnClickSelected = {
    0: { add: addSelected, del: delSelected, non: () => {} },
    1: { add: setShowModal, del: delSelected, non: () => {} },
  };

  async function handleDisableSelectedButton() {
    // if (selected === undefined) return;
    // setFOnClickSelected(demoOnclick);
    if (!selected) {
      setDisableAddDelSelected(false);
      setTextSelected("เปิดการทำงานกลยุทธ์นี้");
      setFAction("add");
      return;
    }
    if (selected.Strategy_Id != stgID) {
      setDisableAddDelSelected(true);
      setTextSelected("คุณได้เลือกเหรียญนี้โดยใช้กลยุทธ์อื่นแล้ว");
      setFAction("non");
      return;
    }
    if (selected.Strategy_Id == stgID) {
      setDisableAddDelSelected(false);
      setTextSelected("ปิดการทำงานกลยุทธ์นี้");
      setFAction("del");
      return;
    }
  }
  useEffect(() => {
    getAvailableBalance();
  }, []);
  useEffect(() => {
    handleDisableSelectedButton();
  }, [stgID, selected]);
  return (
    <div>
      <Button
        variant="primary"
        type="button"
        className="mt-3 mb-2 w-100"
        disabled={disableAddDelSelected}
        onClick={fOnClickSelected[Bot_Type][fAction]}
      >
        {textSelected}
      </Button>
      <ModalSelected
        show={showModal}
        handleClose={handleModalClose}
        sym={sym}
        botData={botData}
        stgID={stgID}
        balances={balance}
        reload={true}
        getAvailableBalance={getAvailableBalance}
        {...props}
      />
    </div>
  );
};
