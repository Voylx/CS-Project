import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export const BackTestDetail = ({ sym, stgID, stgName }) => {
  const durationData = {
    30: "1 month",
    90: "3 months",
    180: "6 months",
    365: "1 year",
    730: "2 years",
    1095: "3 years",
  };

  const [duration, setDuration] = useState(365);
  const [initMoney, setInitMoney] = useState(1000);
  const [data, setData] = useState(undefined);
  const [startData, setStartData] = useState({});
  const [nowData, setNowData] = useState({});

  useEffect(() => {
    getBackTestDetails({});
  }, [stgID]);

  async function getBackTestDetails({ _duration, _initMoney }) {
    try {
      const result = await Axios.get(
        `/api/bot/backtest?stgID=${stgID}&sym=${sym}&durtion=${
          _duration || duration
        }&initMoney=${_initMoney || initMoney}`
      );
      const data = result.data;
      // console.log(data);
      setData(data);
      setStartData({
        data: data.data[0],
        time: data.time[0],
      });
      const datalength = data.data.length;
      setNowData({
        data: data.data[datalength - 1],
        time: data.time[datalength - 1],
      });
    } catch (error) {
      console.error(error.response.data || error);
    }
  }
  function unixDay(unixtime) {
    if (unixtime) {
      var u = new Date(unixtime * 1000);

      return (
        u.getUTCFullYear() +
        "-" +
        ("0" + (u.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + u.getDate()).slice(-2)
      );
    }
  }
  function t_color(data) {
    if (data > 0) return "text-success";
    if (data < 0) return "text-danger";
  }
  return (
    <div>
      <>
        {/* Button Group */}
        <Form.Group className="mb-2" controlId="formButton">
          <Form.Label className="fs-5">Maximum Durtion</Form.Label>
          <div className="d-flex justify-content-center">
            {Object.entries(durationData).map(([value, text], i) => {
              return (
                <Button
                  key={i}
                  variant="primary"
                  type="button"
                  className="p-1 mt-0 mb-0 me-2 btn-sm  "
                  onClick={() => {
                    setDuration(value);
                    getBackTestDetails({ _duration: value });
                  }}
                >
                  {text}
                </Button>
              );
            })}
          </div>
        </Form.Group>

        {/* Input Intial Money */}
        <Form.Group className="mb-2">
          <Form.Label className="fs-5 mt-2">
            Initial money for testing
          </Form.Label>
          <Form.Control
            type="number"
            placeholder=" ใส่จำนวนเงินเรี่มต้นในการ BackTest"
            value={initMoney}
            onChange={(e) => {
              setInitMoney(e.target.value);
              getBackTestDetails({ _initMoney: e.target.value });
            }}
          />
        </Form.Group>
      </>

      <div className="p-1 ms-2 me-2 mb-4">
        <h4 className="text-dark ms-2 ">{stgName}</h4>
        <div className="d-flex justify-content-between">
          <div className="ms-2 ">
            <p className="text-secondary mb-0">Symbol</p>
            <h5>{sym}</h5>
          </div>
          <div className="me-4 mb-0">
            <p className="text-secondary me-lg-5 mb-0">Backtest Duration</p>
            <p className=" ">{durationData[duration]}</p>

            <p className="text-secondary me-lg-4 mb-0">Bot Action</p>
            <p className="text-dark ">{data?.results?.length} Times</p>
            <div className="me-4 mb-0">
              <p className="text-secondary mb-0">Date Start</p>
              <h6 className="">{unixDay(startData?.time)}</h6>
            </div>
          </div>
        </div>

        <div className="d-flex me-lg-5 mb-1 justify-content-around ">
          {/* <div className="ms-3 me-5 ">
            <p className="text-secondary mb-0">Profit / Loss</p>
            <p className="text-secondary mb-0">(THB)</p>

            <h6
              className={`mt-2  ${t_color(
                data?.profit[data?.profit.length - 1] - initMoney
              )}`}
            >
              {data?.profit[data?.profit.length - 1].toFixed(2)}
            </h6>
          </div>
          <div className="  ">
            <p className="text-secondary mb-0">Initial money</p>
            <p className="text-secondary mb-2"> for testing</p>
            <p className=" ">{initMoney || "00.00"}</p>
          </div> */}

          <div className="d-flex flex-column flex-md-row mt-2">
            <p className=" fw-bold me-md-2">Profit/Loss&nbsp;</p>
            <h5 className={t_color(data?.profit_Percent)}>
              {data?.profit_Percent} %
            </h5>
          </div>
          <div className=" d-flex flex-column flex-md-row mt-2">
            <p className=" fw-bold me-md-2">Price move&nbsp;</p>

            <h5
              className={t_color(
                ((nowData?.data - startData?.data) / startData?.data) * 100
              )}
            >
              {(
                ((nowData?.data - startData?.data) / startData?.data) *
                100
              ).toFixed(2)}
              {" %"}
            </h5>
          </div>
        </div>

        <div className="d-flex justify-content-between me-5">
          {/* <div className="ms-1 me-0">
            <p className="text-secondary mb-0">{sym}'s Price </p>
            <p className="text-secondary ">on start date</p>
            <h6 className="">{startData?.data} THB</h6>
          </div>
          <div className="ms-0 ">
            <p className="text-secondary mb-0">{sym}'s</p>
            <p className="text-secondary ">Price now </p>
            <h6 className="">{nowData?.data} THB</h6>
          </div> */}
        </div>
      </div>
    </div>
  );
};
