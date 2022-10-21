import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

import { useAuthen } from "../services/Authen";

import { Header } from "../components/Header";
import { TableHistory } from "../components/TableHistory";
import { ButtonSelected } from "../components/ButtonSelected";

export const SymStgHistory = () => {
  let navigate = useNavigate();
  let params = useParams();
  const isAuthen = useAuthen();

  let [searchParams, setSearchParams] = useSearchParams();
  const Bot_Type = params.botType;

  const [botData, setBotData] = useState({});

  const sym = searchParams.get("sym");
  const stgID = searchParams.get("stgID");
  const [stgName, setStgName] = useState("Strategy_Name");
  const [history, setHistory] = useState([]);

  async function getsymstghistory() {
    try {
      const response = await Axios.get(
        `/api/getsymstghistory?Sym=${sym}&Strategy_id=${stgID}`
      );
      const data = response.data;
      setStgName(data.Strategy_name);
      setHistory(data.historys);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getBotData() {
    const data = JSON.parse(localStorage.getItem(`botData${Bot_Type}`));

    if (!data) {
      console.log("Can't find botData");
      navigate("/bot", { replace: true });
      return;
    }
    setBotData(data);
  }

  useEffect(() => {
    getsymstghistory();
    getBotData();
  }, []);

  return (
    <div>
      <Header />
      <Container fluid="md">
        <div
          className="border p-3 mx-auto mt-5 col-lg-8 col-md-8 shadow-lg"
          style={{ borderRadius: "11px" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="ms-7">{stgName}</h2>
            <h6 className="me-2 text-secondary" onClick={() => navigate(-1)}>
              {"Go back"}
            </h6>
          </div>
          <div className="d-flex  ">
            <h3>{sym}</h3>
            {/* <h4>(open)</h4> */}
          </div>
          {/* <Form.Group className="mb-2" controlId="formBasicApiKeys">
            <Form.Control
              type="UpdateAmount"
              placeholder="แก้ไขจำนวนเงินที่ต้องการให้บอทควบคุม"
              onChange={(event) => {
                setKey(event.target.value);
              }}
              required
            />
          </Form.Group> */}

          {/* lastAction */}
          <h4>
            Last Action:{" "}
            {history.length > 0 ? (
              <span
                className={
                  history[history.length - 1].Side === "BUY"
                    ? "text-success"
                    : "text-danger"
                }
              >
                {history[history.length - 1].Side}
              </span>
            ) : (
              <span> - </span>
            )}
          </h4>

          <ButtonSelected Bot_Type={Bot_Type} sym={sym} stgID={stgID} />

          {/* BackTest */}
          <div className="mt-4 linetext mb-2 text-muted">
            &ensp; Back Test &ensp;{" "}
          </div>

          <p className="">Maximum Durtion</p>

          <div className="">
            <Button
              variant="primary"
              type="button"
              className="p-1 mt-0 mb-1 me-2  btn btn-primary  btn-sm"
              onClick={() => window.location.reload()}
            >
              1 month
            </Button>
            <Button
              variant="primary"
              type="button"
              className="p-1 mt-0 mb-1 me-2 btn btn-primary  btn-sm"
              onClick={() => window.location.reload()}
            >
              3 months
            </Button>
            <Button
              variant="primary"
              type="button"
              className="mt-0 mb-1 me-2 btn btn-primary  btn-sm"
              onClick={() => window.location.reload()}
            >
              6 months
            </Button>
            <Button
              variant="primary"
              type="button"
              className="mt-0 mb-1 me-2 btn btn-primary  btn-sm"
              onClick={() => window.location.reload()}
            >
              1 year
            </Button>
            <Button
              variant="primary"
              type="button"
              className="mt-0 mb-1 me-2 btn btn-primary  btn-sm"
              onClick={() => window.location.reload()}
            >
              2 years
            </Button>
            <Button
              variant="primary"
              type="button"
              className="mt-0 mb-1 btn me-2 btn-primary  btn-sm"
              onClick={() => window.location.reload()}
            >
              3 years
            </Button>
          </div>

          {/* Backtest Result */}
          <div className="p-3">
            <h6>{stgName}</h6>
            <div className="d-flex justify-content-between mt-0">
              <p className="text-secondary ">Symbol</p>
              <p className="text-secondary me-3">Backtest Duration</p>
            </div>{" "}
            <div className="d-flex justify-content-between mt-0">
              <h6>{sym}</h6>
              <p className=" me-3">1 month</p>
            </div>
            <p className="text-secondary">Winning Percentage</p>
            <h6 className="text-success ">12.5%</h6>
            <div className="d-flex justify-content-between">
              <p className="text-secondary me-3">Avarage Winning Trade</p>
              <p className="text-secondary me-3">Avarage Losing Trade</p>
            </div>
            <div className="d-flex justify-content-between">
              <h6 className="text-success me-3">12.5%</h6>
              <h6 className="text-danger me-3">12.5%</h6>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-secondary">Largest Winning trade</p>
              <p className="text-secondary me-3">Largest Losing Trade</p>
            </div>
            <div className="d-flex justify-content-between">
              <h6 className="text-success ">12.5%</h6>
              <h6 className="text-danger me-3">12.5%</h6>
            </div>
          </div>
        </div>
        <div className="mt-4 linetext mb-2 text-muted">
          &ensp; ประวัติการแจ้งเตือนของบอท &ensp;{" "}
        </div>
        <TableHistory history={history} />
      </Container>
    </div>
  );
};
