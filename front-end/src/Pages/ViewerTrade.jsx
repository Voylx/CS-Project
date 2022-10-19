import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthen } from "../services/Authen";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import SymStgBox from "../components/SymStgBox";

import { Header } from "../components/Header";

import "https://s3.tradingview.com/tv.js";

export const ViewerTrade = () => {
  const isAuthen = useAuthen();
  let navigate = useNavigate();
  let params = useParams();

  const Bot_id = params.botId;
  const symbol = params.symbol;

  const [symStgBoxData, setSymStgBoxData] = useState([]);
  const [botData, setBotData] = useState({});

  function getsymstgboxdata_onlysym() {
    Axios.post("/api/getsymstgboxdata_onlysym", {
      Bot_id: Bot_id,
      Sym: symbol,
    })
      .then((res) => {
        if (res.data.status === "success") {
          // console.log(res.data);
          setSymStgBoxData(res.data.data);
        }
      })
      .catch((err) => console.error(err));
  }

  async function getbotData() {
    try {
      const response = await Axios.post("/api/check/bot_by_botid", {
        Bot_id: Bot_id,
      });
      console.log(response.data.bot);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getsymstgboxdata_onlysym();
    getbotData();
    console.log(symStgBoxData);
    new TradingView.widget({
      // autosize: true,
      width: "100%",
      symbol: `BITKUB:${symbol}THB`,
      interval: "D",
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      withdateranges: true,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      container_id: "tradingview_3c6e1",
    });
  }, []);

  return (
    <div>
      <Header />
      <div
        className="border p-3 mx-auto mt-5 col-lg-10 col-md-9 col-sm-9 shadow-lg"
        style={{ borderRadius: "8px" }}
      >
        <div className="d-flex justify-content-between ">
          <h2 className="ms-7">Trading View</h2>
          <h6 className="me-2 text-secondary" onClick={() => navigate(-1)}>
            {"Go back"}
          </h6>
        </div>
        <div className="mb-5 ">
          <div className="fs-1">{symbol}</div>

          <>
            {/* TradingView Widget BEGIN */}
            <div className="tradingview-widget-container">
              <div id="tradingview_3c6e1" />
              <div className="tradingview-widget-copyright">
                <a
                  href={`https://www.tradingview.com/symbols/${symbol}THB/?exchange=BITKUB`}
                  rel="noopener"
                  target="_blank"
                >
                  <span className="blue-text">{symbol} Chart</span>
                </a>{" "}
                by TradingView
              </div>
            </div>
            {/* TradingView Widget END */}
          </>
        </div>
        <div className="linetext mb-4 text-muted">&ensp;Strategy&ensp;</div>
        <Row className="g-3" xs={2} lg={3} xl={4}>
          {symStgBoxData.map((v, i) => {
            return (
              <SymStgBox
                key={i}
                sym={v.Sym}
                stg={v.Strategy_name}
                stgID={v.Strategy_id}
                isFav={v.isFav}
                isSelected={v.isSelected}
                botData={botData}
                side={v.Side}
                datetime={v.Timestamp}
              />
            );
          })}
        </Row>
      </div>
    </div>
  );
};
