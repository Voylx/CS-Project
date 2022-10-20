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

  const Bot_Type = params.botType;
  // let Bot_id = "c3b5f2ea-02a2-45f2-89cc-7305893bddba";

  console.log("Bot_Type", Bot_Type);
  function getbotDetails() {
    const data = JSON.parse(localStorage.getItem(`botData${Bot_Type}`));
    if (data) setBotData(data);
    else {
      console.log("Can't find botData");
      navigate("/bot", { replace: true });
    }
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
    const datatest = JSON.parse(localStorage.getItem("botData"));
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
