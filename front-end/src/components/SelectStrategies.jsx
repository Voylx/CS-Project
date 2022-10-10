import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";

import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

import SymStgBox from "./SymStgBox";

const SelectStrategies = (props) => {
  let navigate = useNavigate();

  const [symbols, setSymbols] = useState([]);
  const [strategies, setStrategies] = useState({});
  const [symbol, setSymbol] = useState("default");
  const [strategy, setStrategy] = useState("default");

  const [symstg, setSymstg] = useState([]);
  const [symstgFilter, setSymstgFilter] = useState([]);

  const [selectFav, setSelectFav] = useState(false);

  useEffect(() => {
    getsymbols();
    getstrategies();
    getsymstgboxdata();
    console.log(symstg);
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
  const getsymstgboxdata = async () => {
    try {
      const res = await Axios.post("/api/getsymstgboxdata", {
        Bot_id: props.botData.Bot_id,
      });
      // console.log(res.data);
      setSymstg(res.data.data);
      setSymstgFilter(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  function handleResetFilter() {
    setSymbol("default");
    setStrategy("default");
    setSymstgFilter(symstg);
    setSelectFav(false);
  }

  async function handleFilterFav() {
    await getsymstgboxdata();
    setSymbol("default");
    setStrategy("default");
    const filter = symstg.filter((v) => {
      return v.isFav;
    });
    setSymstgFilter(filter);
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
          <Col className="mb-1 row" lg={9}>
            {/* select Strategy */}
            <Col className="mb-3">
              {" "}
              <Form.Label>Select Strategy</Form.Label>
              <Form.Select
                aria-label="Select Strategy"
                disabled={selectFav}
                onChange={
                  //
                  function filter(e) {
                    if (symbol === "default" && e.target.value === "default")
                      setSymstgFilter(symstg);
                    else if (
                      symbol !== "default" &&
                      e.target.value !== "default"
                    ) {
                      const filter = symstg.filter((v) => {
                        return (
                          v.Strategy_id === parseInt(e.target.value) &&
                          v.Sym === symbol
                        );
                      });
                      setSymstgFilter(filter);
                    } else if (symbol !== "default") {
                      const sym_filter = symstg.filter((v) => {
                        return v.Sym === symbol;
                      });
                      setSymstgFilter(sym_filter);
                    } else if (e.target.value !== "default") {
                      const stg_filter = symstg.filter((v) => {
                        return v.Strategy_id === parseInt(e.target.value);
                      });
                      setSymstgFilter(stg_filter);
                    }
                    setStrategy(e.target.value);
                  }
                }
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
            <Col className="mb-3">
              <Form.Label>Select Coin</Form.Label>
              <Form.Select
                aria-label="select coin"
                disabled={selectFav}
                onChange={
                  //
                  function filter(e) {
                    if (e.target.value === "default" && strategy === "default")
                      setSymstgFilter(symstg);
                    else if (
                      e.target.value !== "default" &&
                      strategy !== "default"
                    ) {
                      const filter = symstg.filter((v) => {
                        return (
                          v.Strategy_id === parseInt(strategy) &&
                          v.Sym === e.target.value
                        );
                      });
                      setSymstgFilter(filter);
                    } else if (e.target.value !== "default") {
                      const sym_filter = symstg.filter((v) => {
                        return v.Sym === e.target.value;
                      });
                      setSymstgFilter(sym_filter);
                    } else if (strategy !== "default") {
                      const stg_filter = symstg.filter((v) => {
                        return v.Strategy_id === parseInt(strategy);
                      });
                      setSymstgFilter(stg_filter);
                    }
                    setSymbol(e.target.value);
                  }
                }
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
          </Col>

          <Col
            className="mb-3  align-self-end d-flex justify-content-center  "
            lg={1}
            as="h2"
          >
            {selectFav ? (
              <AiFillStar
                className="text-warning mb-2"
                onClick={() => {
                  setSelectFav(false);
                  handleResetFilter();
                }}
              />
            ) : (
              <AiOutlineStar
                className="mb-2"
                onClick={async () => {
                  // await getsymstgboxdata();
                  setSelectFav(true);
                  handleFilterFav();
                }}
              />
            )}
          </Col>

          {/* button */}
          <Col className="mb-3  align-self-end " lg={2}>
            <Button className="w-100 mb-1" onClick={handleResetFilter}>
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
            getsymstgboxdata={getsymstgboxdata}
            selectFav={selectFav}
            {...props}
          />
        ))}
      </Row>
    </>
  );
};

export default SelectStrategies;
