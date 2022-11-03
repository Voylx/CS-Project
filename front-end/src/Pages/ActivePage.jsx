import React, { useState, useEffect } from "react";

import Axios from "../services/Axios";
import { Header } from "../components/Header";
import { Table, Container, Col, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import { useAuthen } from "../services/Authen";

import { TableHistoryTrade } from "../components/TableHistoryTrade";

export const ActivePage = () => {
  const isAuthen = useAuthen();
  let params = useParams();
  let navigate = useNavigate();
  const Bot_Type = params?.botType;

  const [botData, setBotData] = useState(undefined);
  const [history, setHistory] = useState([]);
  const [history_filter, setHistory_filter] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [sel_sym, setSel_sym] = useState("default");

  useEffect(() => {
    getCurrencies();
    if (Bot_Type !== "1") {
      navigate("/bot");
    }
    getBotHistory();
  }, []);

  useEffect(() => {
    handleFilterSym();
  }, [sel_sym]);

  function getbotDetails() {
    const data = JSON.parse(localStorage.getItem(`botData${Bot_Type}`));
    if (data) {
      setBotData(data);
      return data;
    } else {
      console.log("Can't find botData");
      navigate("/bot", { replace: true });
    }
  }
  function getCurrencies() {
    Axios.get("/symbols")
      .then((res) => {
        setCurrencies(res.data.symbols);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleFilterSym() {
    if (sel_sym === "default") {
      setHistory_filter(history);
    } else {
      const sym_fil = history.filter((v, i) => {
        return v.Sym === sel_sym;
      });
      setHistory_filter(sym_fil);
    }
  }

  const getBotHistory = async () => {
    try {
      const botData = getbotDetails();
      const res = await Axios.post("/api/getactionhistory", {
        Bot_id: botData.Bot_id,
      });
      setHistory(res.data.history);
      setHistory_filter(res.data.history);
      console.log(res.data.history);
    } catch (err) {
      console.log(err);
    }
  };

  function unixTime(unixtime) {
    if (unixtime) {
      var u = new Date(unixtime * 1000);

      return (
        u.getUTCFullYear() +
        "-" +
        ("0" + (u.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + u.getDate()).slice(-2) +
        " : " +
        ("0" + u.getHours()).slice(-2) +
        ":" +
        ("0" + u.getMinutes()).slice(-2) +
        ":" +
        ("0" + u.getSeconds()).slice(-2)
      );
    }
  }
  function numFormat(num) {
    return new Intl.NumberFormat().format(num);
  }

  return (
    <>
      <Header />
      <Container fluid="md">
        <div className="bg-light bg-opacity-25">
          <div className="fs-2 mt-3">ประวัติการซื้อขายของบอท</div>
          <div className="mt-1 linetext mb-2 text-muted" />

          {/* Filter Currency */}
          <Col className="mb-3" xs={12} sm={6}>
            {" "}
            <Form.Label className="fs-4">Currency</Form.Label>
            <Form.Select
              aria-label="Select Symbol"
              onChange={(e) => {
                setSel_sym(e.target.value);
              }}
            >
              <option value="default" className="text-muted ">
                [All]
              </option>

              {Object.entries(currencies).map(([k, v]) => (
                <option value={v} key={k}>
                  {v}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Table className="mt-4 table table-striped table-hover">
            <thead>
              <tr className="">
                <th className="table-primary">Time</th>
                <th className="table-secondary">Currency</th>
                <th className="table-primary">Side</th>
                <th className="table-secondary">จำนวนเงิน</th>
                <th className="table-primary">จำนวนเหรียญ</th>
              </tr>
            </thead>
            <tbody>
              {history_filter.length > 0 ? (
                history_filter.map((v, i) => {
                  // console.log(v);
                  return (
                    <tr key={i}>
                      <td>{unixTime(v.ts)}</td>
                      <td>{v.Sym}</td>
                      <td>{v.Side}</td>
                      <td>{numFormat(v.Amt_money)} THB</td>
                      <td>
                        {v.Amt_coins} {v.Sym}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};
