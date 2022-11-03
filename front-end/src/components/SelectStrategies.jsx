import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";

import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

import SymStgBox from "./SymStgBox/SymStgBox";

const SelectStrategies = (props) => {
  let navigate = useNavigate();

  const [symbols, setSymbols] = useState([]);
  const [strategies, setStrategies] = useState({});
  const [symbol, setSymbol] = useState("default");
  const [strategy, setStrategy] = useState("default");

  const [symstg, setSymstg] = useState([]);
  const [symstgFilter, setSymstgFilter] = useState([]);

  const [filFav, setFilFav] = useState(false);
  const [filSelect, setFilSelect] = useState(false);

  const [balance, setBalance] = useState({});

  useEffect(() => {
    getsymbols();
    getstrategies();
    getsymstgboxdata();
    // console.log(symstg);
    props.botData.Type && getAvailableBalance();
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
      return res.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  function handleResetFilter() {
    setSymbol("default");
    setStrategy("default");
    setSymstgFilter(symstg);
    setFilFav(false);
  }

  async function handleFilterFav() {
    const aaa = await getsymstgboxdata();
    const filter = aaa.filter((v) => {
      return v.isFav;
    });
    setSymstgFilter(filter);
    setSymbol("default");
    setStrategy("default");
  }

  async function handleFilterSelect() {
    const aaa = await getsymstgboxdata();
    const filter = aaa.filter((v) => {
      return v.isSelected;
    });
    setSymstgFilter(filter);
    setSymbol("default");
    setStrategy("default");
  }

  const getAvailableBalance = () => {
    Axios.post("/api/available_balance", {
      Bot_id: props.botData.Bot_id,
    })
      .then((balance) => {
        // console.log(balance.data);
        setBalance(balance.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function StgSelectAndFilterBox() {
    return (
      <div className="border rounded-3 p-3 mb-5 mx-auto   shadow-lg col-lg-10 ">
        <Row>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="ms-7 ">Strategy bot</h2>
            <h6
              className="me-2 text-secondary c-grab"
              onClick={() => navigate(-1)}
            >
              {"Go back"}
            </h6>
          </div>
          <Col className="mb-1 row" md={9} sm={12}>
            {/* select Strategy */}
            <Col className="mb-3" xs={12} sm={6}>
              {" "}
              <Form.Label>Select Strategy</Form.Label>
              <Form.Select
                aria-label="Select Strategy"
                disabled={filFav || filSelect}
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
            <Col className="mb-3" xs={12} sm={6}>
              <Form.Label>Select Coin</Form.Label>
              <Form.Select
                aria-label="select coin"
                disabled={filFav || filSelect}
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
            className=" mb-2 align-self-end d-flex justify-content-center  "
            md={1}
            xs={{ span: 2, order: "last" }}
          >
            <h2 className="d-flex ">
              {filFav ? (
                <AiFillStar
                  className="text-warning mb-2 mx-1"
                  onClick={() => {
                    setFilFav(false);
                    handleResetFilter();
                  }}
                />
              ) : (
                <AiOutlineStar
                  className={`mb-2 mx-1 ${filSelect && "text-muted"}`}
                  onClick={async () => {
                    if (!filSelect) {
                      setFilFav(true);
                      handleFilterFav();
                    }
                  }}
                />
              )}
              {filSelect ? (
                <MdCheckBox
                  className="text-primary mb-2 mx-1"
                  onClick={() => {
                    setFilSelect(false);
                    handleResetFilter();
                  }}
                />
              ) : (
                <MdCheckBoxOutlineBlank
                  className={`mb-2 mx-1 ${filFav && "text-muted"}`}
                  onClick={async () => {
                    if (!filFav) {
                      setFilSelect(true);
                      handleFilterSelect();
                    }
                  }}
                />
              )}
            </h2>
          </Col>

          {/* button */}
          <Col
            className="mb-3  align-self-end "
            md={{ span: 2, order: "last" }}
            xs={9}
          >
            <Button className="w-100 mb-1" onClick={handleResetFilter}>
              Reset
            </Button>
          </Col>
        </Row>
        <Row>
          <p className="text-danger text-center">
            *** 1 เหรียญ เลือกได้ 1 กลยุทธ์ เท่านั้น ***
          </p>
          <a
            className="link-primary  ms-1"
            onClick={() => (location = "/StgInfo")}
          >
            ศึกษากลยุทธ์เพิ่มเติม...
          </a>
        </Row>
      </div>
    );
  }
  return (
    <>
      <StgSelectAndFilterBox />
      <Row className="g-3" xs={1} md={3} lg={4} xxl={5}>
        {symstgFilter.map((v) => (
          <SymStgBox
            sym={v.Sym}
            stg={v.Strategy_name}
            stgID={v.Strategy_id}
            key={v.Sym + v.Strategy_id}
            isFav={Boolean(v.isFav)}
            isSelected={Boolean(v.isSelected)}
            side={v.Side}
            datetime={v.Timestamp}
            balances={balance}
            getAvailableBalance={getAvailableBalance}
            {...props}
          />
        ))}
      </Row>
    </>
  );
};

export default SelectStrategies;
