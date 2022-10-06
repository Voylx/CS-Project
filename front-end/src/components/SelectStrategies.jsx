import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";

import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Row, Col } from "react-bootstrap";

import SymStgBox from "./SymStgBox";

const SelectStrategies = (props) => {
  let navigate = useNavigate();

  const [symbols, setSymbols] = useState([]);
  const [strategies, setStrategies] = useState({});
  const [symbol, setSymbol] = useState("default");
  const [strategy, setStrategy] = useState("default");
  const [stgFilter, setStgFilter] = useState([]);

  const [symstg, setSymstg] = useState([]);
  const [symstgFilter, setSymstgFilter] = useState(symstg);

  useEffect(() => {
    getsymbols();
    getstrategies();
    getsymstgboxdata();
  }, []);

  function getsymbols() {
    Axios.get("/symbols")
      .then((res) => {
        setSymbols(res.data.symbols);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getstrategies() {
    Axios.get("/strategies")
      .then((res) => {
        setStrategies(res.data.strategies);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getsymstgboxdata() {
    Axios.post("/api/getsymstgboxdata", {
      Bot_id: props.botData.Bot_id,
    })
      .then((res) => {
        // console.log(res.data);
        setSymstg(res.data.data);
        setSymstgFilter(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleResetFilter() {
    setSymbol("default");
    setStrategy("default");
    setSymstgFilter(symstg);
  }

  function StgSelectAndFilterBox() {
    return (
      <div className="border rounded-3 p-3 mb-5 mx-auto mt-5  shadow-lg col-lg-10 ">
        <Row>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="ms-7 ">Strategy bot</h2>
            <h6 className="me-2 text-secondary" onClick={() => navigate(-1)}>
              {"Go back"}
            </h6>
          </div>
          {/* select Strategy */}
          <Col className="mb-3" lg={5}>
            {" "}
            .<Form.Label>Select Strategy</Form.Label>
            <Form.Select
              aria-label="Select Strategy"
              onChange={(e) => {
                setStrategy(e.target.value);

                if (e.target.value === "default") setSymstgFilter(symstg);
                else {
                  const sym_filter = symstg.filter((v) => {
                    return v.Strategy_id === parseInt(e.target.value);
                  });
                  setSymstgFilter(sym_filter);
                }
              }}
              value={strategy}
            >
              <option value="default" className="text-muted">
                [All]
              </option>

              {Object.entries(strategies).map(([k, v]) => (
                <option value={k} key={k}>
                  {v}
                </option>
              ))}
            </Form.Select>
          </Col>

          {/* select Coin */}
          <Col className="mb-3" lg={5}>
            <Form.Label>Select Coin</Form.Label>
            <Form.Select
              aria-label="select coin"
              onChange={(e) => {
                setSymbol(e.target.value);
                if (e.target.value === "default") setSymstgFilter(symstg);
                else {
                  const sym_filter = symstg.filter((v) => {
                    return v.Sym === e.target.value;
                  });
                  setSymstgFilter(sym_filter);
                }
              }}
              value={symbol}
            >
              <option value="default" className="text-muted">
                [All]
              </option>

              {symbols.map((v) => (
                <option value={v} key={v}>
                  {v}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col className="mb-3  align-self-end " lg={2}>
            <Button className="w-100 " onClick={handleResetFilter}>
              Reset
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
  return (
    <>
      <StgSelectAndFilterBox />
      <Row className="g-3" xs={2} lg={3} xl={4}>
        {symstgFilter.map((v, i) => (
          <SymStgBox
            sym={v.Sym}
            stg={v.Strategy_name}
            stgID={v.Strategy_id}
            i={i}
            key={v.Sym + v.Strategy_id}
            isFav={Boolean(v.isFav)}
            {...props}
          />
        ))}
      </Row>
    </>
  );
};

export default SelectStrategies;
