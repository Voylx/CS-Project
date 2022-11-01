import React, { useState, useEffect } from "react";

import Axios from "../../services/Axios";

import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import settingpic from "../../icons/settings.png";

export const Box = (props) => {
  const { botData, type } = props;
  let navigate = useNavigate();

  const linksetting = {
    0: () => navigate("../linkapiline"),
    1: () => navigate("../bitkubupdate"),
  };

  return (
    <div
      className="bg-secondary mt-3 mb-2 mx-2 p-2 rounded "
      style={{ height: "8rem" }}
    >
      <img
        src={settingpic}
        alt="setting"
        height={"22rem"}
        className="float-end"
        onClick={linksetting[type]}
      />
      <div className=" d-flex flex-column p-3 mt-1 mb-2 justify-content-around align-items-center">
        {botData.Bot_id}
        <Button
          className="mt-3 mb-2"
          onClick={() => {
            navigate(`../${type}`);
          }}
        >
          Control
        </Button>
      </div>
    </div>
  );
};
