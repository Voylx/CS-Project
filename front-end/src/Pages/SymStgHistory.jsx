import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";

import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { Container, Button, Alert } from "react-bootstrap";

import { useAuthen } from "../services/Authen";

import { Header } from "../components/Header";
import { TableHistory } from "../components/TableHistory";
import { ButtonSelected } from "../components/ButtonSelected";
import { BackTestDetail } from "../components/BackTestDetail";
import { BotActiveStatus } from "../components/BotActiveStatus";

export const SymStgHistory = () => {
  let navigate = useNavigate();

  let params = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  // const [Bot_Type, setBot_Type] = useState(params.botType);
  const Bot_Type = params.botType;

  const sym = searchParams.get("sym");
  const [stgID, setStgID] = useState(searchParams.get("stgID"));
  const [stgName, setStgName] = useState("");
  const [history, setHistory] = useState([]);
  const [strategies, setStrategies] = useState({});
  const [selected, setSelected] = useState(undefined);
  const [showProfit, setShowProfit] = useState(false);

  const botData = JSON.parse(localStorage.getItem(`botData${Bot_Type}`));

  const isAuthen = useAuthen();

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

  async function getstg() {
    try {
      const response = await Axios.get(`/strategies`);
      const data = response.data;
      // setStgName(data.Strategy_name);
      // setHistory(data.historys);
      setStrategies(data.strategies);
    } catch (error) {
      console.error(error);
    }
  }

  async function getSymSelected() {
    if (!botData.Bot_id) return;
    try {
      const response = await Axios.post(`/api/check/isSelectedSym`, {
        Bot_id: botData.Bot_id,
        Sym: sym,
      });
      // console.log(response.data.selected);
      setSelected(response.data.selected);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleShowProfit() {
    if (!selected) return;

    if (selected.Strategy_Id == stgID) {
      setShowProfit(true);
      return;
    }
    setShowProfit(false);
  }

  useEffect(() => {
    // setBot_Type(params.botType);
    document.title = "Crypto-Bot : Backtest & History";
    getsymstghistory();
    getstg();
    getSymSelected();
    // console.log(Bot_Type);
  }, []);

  useEffect(() => {
    getsymstghistory();
    handleShowProfit();
  }, [stgID, selected]);

  return (
    <div>
      <Header />
      <Container fluid="md">
        <div
          className="border p-3 mx-auto mt-5 col-lg-8 col-md-9 shadow-lg"
          style={{ borderRadius: "11px" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="ms-7">{stgName}</h2>
            <h6
              className="me-2 text-secondary c-grab"
              onClick={() => navigate(-1)}
            >
              {"Go back"}
            </h6>
          </div>
          <div className="d-flex  ">
            <h3>{sym}</h3>
            {/* <h4>(open)</h4> */}
          </div>

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
          {/* Active Box */}
          {showProfit && (
            <BotActiveStatus Bot_Type={Bot_Type} botData={botData} sym={sym} />
          )}

          <ButtonSelected
            Bot_Type={Bot_Type}
            sym={sym}
            stgID={stgID}
            stg={stgName}
            botData={botData}
            selected={selected}
          />

          {/* Change Strategy */}
          <>
            <div className="mt-4 linetext mb-3 text-muted">
              &ensp; Strategy &ensp;
            </div>
            <div className="d-flex justify-content-center">
              {Object.entries(strategies).map(([stg_id, stg_name], i) => {
                return (
                  <Button
                    key={i}
                    variant="primary"
                    type="button"
                    className="p-1 mt-0 mb-0 me-2 btn-sm"
                    onClick={() => {
                      setSearchParams(
                        { sym: sym, stgID: stg_id },
                        { replace: true }
                      );
                      setStgID(stg_id);
                      // setDuration(value);
                      // getBackTestDetails({ _duration: value });
                    }}
                  >
                    {stg_name}
                  </Button>
                );
              })}
            </div>
          </>

          {/* BackTest */}
          <div className="mt-2 linetext mb-2 text-muted">
            &ensp; Back Test &ensp;
          </div>
          {/* BackTestDetail */}
          <BackTestDetail sym={sym} stgID={stgID} stgName={stgName} />
        </div>

        <TableHistory history={history} />
      </Container>
    </div>
  );
};
