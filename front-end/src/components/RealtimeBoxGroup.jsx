import React, { useState, useEffect } from "react";

import Axios from "../services/Axios";
import { Row, Col } from "react-bootstrap";

import RealtimeBox from "./RealtimeBox";

const RealtimeBoxGroup = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    gettickers();
  }, []);

  function gettickers() {
    Axios.get("/api/tickers")
      .then((res) => {
        setData(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Row className="m-4 g-2 " xs={3} lg={3} xl={4}>
      {Object.entries(data).map(([k, v], i) => {
        return <RealtimeBox key={k} sym={k} data={v} />;
      })}
    </Row>
  );
};

export default RealtimeBoxGroup;
