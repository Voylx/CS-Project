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

  const [botInfo, setBotInfo] = useState({});

  useEffect(() => {
    if (botData.Bot_id) {
      getbotInfo();
    }
  }, [botData]);

  function getbotInfo() {
    Axios.post("/api/bot_info", {
      Bot_id: botData.Bot_id,
    })
      .then((res) => {
        console.log(res.data);
        setBotInfo(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div
      className="bg-white mt-3 mb-2 mx-2 p-2 rounded h-bg-primary "
      // style={{ height: "8rem" }}
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
            <div>Bot Selected : {botInfo.countSelected}/21 Currency</div>
            {Boolean(type) ? (
              <div>
                Already buy : {botInfo.countBUY}/{botInfo.countSelected}{" "}
                Currency
              </div>
            ) : (
              <br />
            )}
            {Boolean(type) ? (
              <div>
                Wait for signal : {botInfo.countWait}/{botInfo.countSelected}{" "}
                Currency
              </div>
            ) : (
              <br />
            )}
            {Boolean(type) ? (
              <div>Balance : {botInfo.Balance?.toFixed(2)} THB</div>
            ) : (
              <br />
            )}
            {Boolean(type) ? (
              <div> Profit : {botInfo.pnl_percent?.toFixed(2)} %</div>
            ) : (
              <br />
            )}

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
