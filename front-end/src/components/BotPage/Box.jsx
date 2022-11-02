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
      className="bg-white mt-3 mb-2 mx-2 p-2 rounded h-bg-primary "
      style={{ height: "8rem" }}
    >
      <img
        src={settingpic}
        alt="setting"
        height={"22rem"}
        className="float-end"
        onClick={linksetting[type]}
      />

      <div className=" d-flex flex-column p-3 mt-1 mb-2 justify-content-around align-items-center  ">
        {botData.Bot_id ? (
          <>
            {/* <div>{botData.Bot_id}</div> */}
            <div>Bot Selected : 7/21 Currency</div>
            <div>Already buy : 4/21 Currency</div>
            <div>Wait for signal : 4/21 Currency</div>
            {Boolean(type) && <div>Amount : 2000 BHT</div>}
            {Boolean(type) && <div> Profit : 20 %</div>}

            <Button
              className="mt-3 mb-2"
              onClick={() => {
                navigate(`../${type}`);
              }}
            >
              Control
            </Button>
          </>
        ) : (
          <>Loading...</>
        )}
      </div>
    </div>
  );
};
