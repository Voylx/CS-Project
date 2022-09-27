import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";

import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Row, Col } from "react-bootstrap";

const SelectStrategies = () => {
  let navigate = useNavigate();

  const [symbols, setSymbols] = useState([]);
  const [strategies, setStrategies] = useState({});
  const [symbol, setSymbol] = useState("default");
  const [strategy, setStrategy] = useState("default");
  const [symsFilter, setSymsFilter] = useState(symbols);
  const [stgFilter, setStgFilter] = useState(strategies);

  useEffect(() => {
    getsymbols();
    getstrategies();
  }, []);

  function getsymbols() {
    Axios.get("/symbols")
      .then((res) => {
        setSymbols(res.data.symbols);
        setSymsFilter(res.data.symbols);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getstrategies() {
    Axios.get("/strategies")
      .then((res) => {
        setStrategies(res.data.strategies);
        setStgFilter(res.data.strategies);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleFilter() {
    if (symbol === "default") setSymsFilter(symbols);
    else setSymsFilter([symbol]);
    if (strategy === "default") setStgFilter(strategies);
    else setStgFilter({ [strategy]: strategies[strategy] });
  }

  function SymStgBox({ sym, stg, i }) {
    return (
      <Col className="">
        <div
          className="border rounded-3 shadow p-2 mb-1 "
          style={
            {
              // height: "7rem",
            }
          }
        >
          <h6 className="m-0">{stg}</h6>
          <h6 className="m-0 text-primary">{sym}</h6>
          {i % 2 == 0 ? (
            <p className="m-0 fs-6 text-success">BUY</p>
          ) : (
            <p className="m-0 fs-6 text-danger">SELL</p>
          )}
          <p className="m-0 fs-6 text-muted">2022-09-05 : 22:43:00</p>
          <p className="m-0 fs-6 text-muted">(3 days ago) </p>
        </div>
      </Col>
    );
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
            <Form.Label>Select Strategy</Form.Label>
            <Form.Select
              aria-label="Select Strategy"
              onChange={(e) => {
                setStrategy(e.target.value);
                if (e.target.value === "default") setStgFilter(strategies);
                else
                  setStgFilter({
                    [e.target.value]: strategies[e.target.value],
                  });
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
                if (e.target.value === "default") setSymsFilter(symbols);
                else setSymsFilter([e.target.value]);
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
            <Button className="w-100 " onClick={handleFilter}>
              Filter...
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
        {/* {[1, 2, 3, 4, 5, 6, 7].map((i) => {
          return <SymStgBox i={i} />;
        })} */}
        {symsFilter.map((sym, i) => {
          return Object.entries(stgFilter).map(([k, v], i) => {
            return <SymStgBox sym={sym} stg={v} i={i} key={sym + v} />;
          });
        })}
      </Row>
    </>
  );
};

export default SelectStrategies;
