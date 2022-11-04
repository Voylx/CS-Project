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

  const [botInfo, setBotInfo] = useState(undefined);

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

  function numFormat(num) {
    return new Intl.NumberFormat().format(num);
  }

  return (
    <div
      className="bg-white mt-3 mb-2 mx-2 p-2 rounded h-bg-primary "
      // style={{ height: "16rem" }}
    >
      <img
        src={settingpic}
        alt="setting"
        height={"22rem"}
        className="float-end f-inv "
        onClick={linksetting[type]}
      />

      <div className=" d-flex flex-column p-3 mt-1 mb-2   ">
        {botData.Bot_id ? (
          <div className="">
            {/* <div>{botData.Bot_id}</div> */}
            <div className="d-flex justify-content-center  fs-5">
              Bot Selected :{" "}
              {botInfo ? `${botInfo.countSelected}/21 Currency` : "Loading..."}
            </div>
            {/* {Boolean(type) ? (
              <div className="d-flex justify-content-center fs-5 ">
                Already buy : {botInfo.countBUY}/{botInfo.countSelected}{" "}
                Currency
              </div>
            ) : (
              <br />
            )} */}
            {/* {Boolean(type) ? (
              <div className="d-flex justify-content-center fs-5">
                Wait for signal : {botInfo.countWait}/{botInfo.countSelected}{" "}
                Currency
              </div>
            ) : (
              <br />
            )} */}
            {Boolean(type) ? (
              <div className="d-flex justify-content-center ">
                Initial money :{" "}
                {botInfo
                  ? `${numFormat(botInfo?.Initial_money?.toFixed(2))} THB`
                  : "Loading.."}
              </div>
            ) : (
              <br />
            )}
            {Boolean(type) ? (
              <div className="d-flex justify-content-center ">
                Balance :{" "}
                {botInfo
                  ? `${numFormat(botInfo?.Balance?.toFixed(2))} THB`
                  : "Loading.."}
              </div>
            ) : (
              <br />
            )}
            {Boolean(type) ? (
              <div className="d-flex justify-content-center ">
                {" "}
                Profit / Lost :{" "}
                {botInfo ? (
                  botInfo?.pnl_percent > 0 ? (
                    <div className="text-success">
                      &nbsp;
                      {numFormat(botInfo?.pnl?.toFixed(2))}
                      {"  "}({botInfo?.pnl_percent?.toFixed(2)} % )⬆
                    </div>
                  ) : (
                    <div className="text-danger">
                      &nbsp;
                      {numFormat(botInfo?.pnl?.toFixed(2))}
                      {"  "}({botInfo?.pnl_percent?.toFixed(2)} % )⬇
                    </div>
                  )
                ) : (
                  "Loading.."
                )}
              </div>
            ) : (
              <br />
            )}

            {/* <Button
              className="d-flex justify-content-center mt-2 mb-0 "
              onClick={() => {
                navigate(`../${type}`);
              }}
            >
              Control
            </Button> */}
            <Button
              type="button"
              className="mb-2 w-100 mt-3 mb-0"
              onClick={() => {
                navigate(`../${type}`);
              }}
            >
              Control
            </Button>
          </div>
        ) : (
          <>Loading...</>
        )}
      </div>
    </div>
  );
};
