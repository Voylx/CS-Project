import React, { useState, useEffect } from "react";

import Axios from "../services/Axios";
import { Header } from "../components/Header";
import { Table, Container } from "react-bootstrap";
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

  useEffect(() => {
    if (Bot_Type !== "1") {
      navigate("/bot");
    }
    getBotHistory();
  }, []);

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

  const getBotHistory = async () => {
    try {
      const botData = getbotDetails();
      const res = await Axios.post("/api/getactionhistory", {
        Bot_id: botData.Bot_id,
      });
      setHistory(res.data.history);
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

  return (
    <>
      <Header />
      <Container fluid="md">
        <div className="bg-light bg-opacity-25">
          <div className="fs-1 mt-2">ประวัติการซื้อขายของบอท</div>
          <div className="mt-1 linetext mb-3 text-muted" />
          <Table className="mt-4 table table-striped table-hover">
            <thead>
              <tr className="">
                <th className="table-primary">Time</th>
                <th className="table-secondary">Currency</th>
                <th className="table-primary">Side</th>
                <th className="table-secondary">xxxxxx</th>
                <th className="table-primary">xxxxx</th>
              </tr>
            </thead>
            <tbody>
              {history.map((v, i) => {
                console.log(v);
                return (
                  <tr key={i}>
                    <td className="table-primary">{unixTime(v.ts)}</td>
                    <td className="table-secondary">{v.Sym}</td>
                    <td className="table-primary">{v.Side}</td>
                    <td className="table-secondary">{v.Amt_money} THB</td>
                    <td className="table-primary">
                      {v.Amt_coins} {v.Sym}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};
