import React from "react";
import { useParams } from "react-router-dom";

import { useAuthen } from "../services/Authen";

import { Header } from "../components/Header";

export const BotDetails = () => {
  const isAuthen = useAuthen();
  let params = useParams();
  //   console.log(params);
  return (
    <div>
      <Header />
      BotDetails
      {params.botId}
    </div>
  );
};
