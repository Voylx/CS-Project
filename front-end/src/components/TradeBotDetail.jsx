import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";

import { Container } from "react-bootstrap";

export const TradeBotDetail = () => {
  const [API, setAPI] = useState();

  function getapibitkub() {
    Axios.post("/bot/getapibitkub", {})
      .then((res) => {
        console.log(res.data);
        setAPI(res.data.LinkAPI);
      })
      .catch((err) => console.error(err.response.data));
  }

  useEffect(() => {
    getapibitkub();
  }, []);

  return (
    <>
      <Container>
        <div className="border rounded-3 p-3 mx-auto mt-5  shadow-lg col-lg-10">
          hello
        </div>
      </Container>
    </>
  );
};
