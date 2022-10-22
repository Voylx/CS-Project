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
      console.log(data);
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
          <Form.Label className="">Maximum Durtion</Form.Label>
          <div>
            {Object.entries(durationData).map(([value, text], i) => {
              return (
                <Button
                  key={i}
                  variant="primary"
                  type="button"
                  className="p-1 mt-0 mb-1 me-2  btn btn-primary  btn-sm"
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
          <Form.Label className="">Initial money for testing</Form.Label>
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

      <div className="p-3">
        <h5 className="text-dark">{stgName}</h5>
        <div className="d-flex justify-content-between">
          <div className="">
            <p className="text-secondary ">Symbol</p>
            <h6>{sym}</h6>
          </div>
          <div className="">
            <p className="text-secondary ">Backtest Duration</p>
            <p className=" ">{durationData[duration]}</p>

            <p className="text-secondary ">Bot Action</p>
            <p className="text-dark ">{data?.results?.length} Times</p>
          </div>
        </div>
        <div className="d-flex justify-content-between me-5">
          <div>
            <p className="text-secondary">Profit and Loss Percentage</p>
            <h6 className={t_color(data?.profit_Percent)}>
              {data?.profit_Percent} %
            </h6>
            <p className="text-secondary ">Date Start</p>
            <h6 className="">{unixDay(startData?.time)}</h6>
          </div>
          <div>
            <p className="text-secondary ">Initial money for testing</p>
            <p className=" ">{initMoney || "00.00"}</p>
          </div>
          <div>
            <div>
              <p className="text-secondary">Profit (THB)</p>
              <h6
                className={t_color(
                  data?.profit[data?.profit.length - 1] - initMoney
                )}
              >
                {data?.profit[data?.profit.length - 1].toFixed(2)}
              </h6>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between me-5">
          <div>
            <p className="text-secondary ">{sym} Price on date start </p>
            <h6 className="">{startData?.data} THB</h6>
          </div>
          <div>
            <p className="text-secondary ">{sym} Price to day </p>
            <h6 className="">{nowData?.data} THB</h6>
          </div>
          <div>
            <p className="text-secondary ">Price move </p>
            <h6 className="">
              {(
                ((nowData?.data - startData?.data) / startData?.data) *
                100
              ).toFixed(2)}
              {" %"}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};
