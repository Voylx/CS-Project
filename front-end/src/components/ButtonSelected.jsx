import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ButtonSelected = ({ Bot_Type, sym, stgID }) => {
  let navigate = useNavigate();
  const botData = JSON.parse(localStorage.getItem(`botData${Bot_Type}`));
  const [selected, setSelected] = useState(undefined);
  const [disableAddDelSelected, setDisableAddDelSelected] = useState(true);
  const [textSelected, setTextSelected] = useState("ปิดการแจ้งเตือนกลยุทธ์นี้");

  const [fAction, setFAction] = useState("non");

  function addSelected() {
    Axios.post("/api/addselected", {
      Bot_id: botData.Bot_id,
      Sym: sym,
      Strategys_Id: stgID,
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
      Strategys_Id: stgID,
    })
      .then((res) => {
        if (res.data.status === "success") {
          navigate(0);
        }
      })
      .catch((err) => console.error(err));
  }
  const fOnClickSelected = {
    add: addSelected,
    del: delSelected,
    non: () => {},
  };
  async function getSymSelected() {
    if (!botData.Bot_id) return;
    try {
      const response = await Axios.post(`/api/check/isSelectedSym`, {
        Bot_id: botData.Bot_id,
        Sym: sym,
      });
      setSelected(response.data.selected);
    } catch (error) {
      console.error(error);
    }
  }
  async function handleDisableSelectedButton() {
    if (selected === undefined) return;
    // setFOnClickSelected(demoOnclick);
    if (!selected) {
      setDisableAddDelSelected(false);
      setTextSelected("เปิดการแจ้งเตือนกลยุทธ์นี้");
      setFAction("add");
      return;
    }
    if (selected.Strategys_Id != stgID) {
      setDisableAddDelSelected(true);
      setTextSelected("คุณได้เลือกเหรียญนี้โดยใช้กลยุทธ์อื่นแล้ว");
      setFAction("non");
      return;
    }
    if (selected.Strategys_Id == stgID) {
      setDisableAddDelSelected(false);
      setTextSelected("ปิดการแจ้งเตือนกลยุทธ์นี้");
      setFAction("del");
      return;
    }
  }
  useEffect(() => {
    getSymSelected();
  }, []);
  useEffect(() => {
    // console.log(selected);
    handleDisableSelectedButton();
  }, [selected]);
  return (
    <div>
      <Button
        variant="primary"
        type="button"
        className="mt-3 mb-2 w-100"
        disabled={disableAddDelSelected}
        onClick={fOnClickSelected[fAction]}
      >
        {textSelected}
      </Button>
    </div>
  );
};
