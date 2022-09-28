import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuthen } from "../services/Authen";

import { Header } from "../components/Header";

import { TradeBotDetail } from "../components/TradeBotDetail";
import { LineBotDetail } from "../components/LineBotDetail";

export const BotDetails = () => {
  const isAuthen = useAuthen();
  let params = useParams();
  let navigate = useNavigate();

  const [botData, setBotData] = useState({});

  const Bot_id = params.botId;
  function getbotDetails() {
    Axios.post("/api/check/bot_by_botid", { Bot_id })
      .then((res) => {
        setBotData(res.data?.bot);
      })
      .catch((err) => {
        console.error(err.response.data);
        navigate("/bot", { replace: true });
      });
  }

  useEffect(() => {
    getbotDetails();
    console.log(
      Object.keys(botData).length !== 0
        ? botData.Type
          ? "Trade"
          : "Line"
        : "None"
    );
    console.log(botData);
  }, []);

  return (
    <div>
      <Header />
      {Object.keys(botData).length !== 0 ? (
        botData.Type ? (
          <TradeBotDetail botData={botData} />
        ) : (
          <LineBotDetail botData={botData} />
        )
      ) : (
        <></>
      )}
    </div>
  );
};
