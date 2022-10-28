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

  const [botData, setBotData] = useState(undefined);

  const Bot_Type = params.botType;

  // console.log("Bot_Type", Bot_Type);
  function getbotDetails() {
    const data = JSON.parse(localStorage.getItem(`botData${Bot_Type}`));
    if (data) setBotData(data);
    else {
      console.log("Can't find botData");
      navigate("/bot", { replace: true });
    }
  }

  useEffect(() => {
    document.title = "Crypto-Bot : Bot Details";
    getbotDetails();
    // console.log(
    //   Object.keys(botData).length !== 0
    //     ? botData.Type
    //       ? "Trade"
    //       : "Line"
    //     : "None"
    // );
    // console.log(botData);
  }, []);

  return (
    <div>
      <Header />
      {botData ? (
        Bot_Type === "1" ? (
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
