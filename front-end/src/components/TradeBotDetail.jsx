import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";
import { useNavigate } from "react-router-dom";

import { Button, Container } from "react-bootstrap";

export const TradeBotDetail = () => {
  let navigate = useNavigate();
  const [symbols, setSymbols] = useState([]);

  function checkLinkAPI() {
    Axios.post("/bot/getapibitkub", {})
      .then((res) => {
        // console.log(res.data);
        if (!res.data.linkAPI) {
          navigate("/bot/bitkub");
        }
      })
      .catch((err) => console.error(err?.response?.data));
  }
  function getsymbols() {
    Axios.get("/symbols")
      .then((res) => {
        setSymbols(res.data.symbols);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    checkLinkAPI();
    getsymbols();
  }, []);

  return (
    <>
      <Container>
        <div className="border rounded-3 p-3 mx-auto mt-5  shadow-lg col-lg-10 ">
          {/* {isLinkAPI ? "LINK" : "DASHBOARD"} */}
          {/* LINKAPI
          <Button>LINK_API</Button> */}
          {symbols}
        </div>
      </Container>
    </>
  );
};
