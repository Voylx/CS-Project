import React, { useState, useEffect } from "react";

import Axios from "../services/Axios";
import { Header } from "../components/Header";
import { Table, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { TableHistoryTrade } from "../components/TableHistoryTrade";

export const ActivePage = () => {
  let params = useParams();
  let navigate = useNavigate();
  const Bot_Type = params?.botType;

  const [botData, setBotData] = useState(undefined);

  useEffect(() => {
    if (Bot_Type !== "1") {
      navigate("/bot");
    }
    getsymstgboxdata();
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

  const getsymstgboxdata = async () => {
    try {
      const botData = getbotDetails();
      const res = await Axios.post("/api/getsymstgboxdata", {
        Bot_id: botData.Bot_id,
      });
      const data = res.data.data;
      const selData = data.filter((v, i) => {
        return v.isSelected;
      });
      console.log(selData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <Container fluid="md">
        <div className="bg-light bg-opacity-25">
          <Table className="mt-4 table table-striped table-hover">
            <thead>
              <tr className="">
                <td className="table-primary">Date</td>
                <td className="table-secondary">Time</td>
                <td className="table-primary">Side</td>
                <td className="table-secondary">Amount</td>
                <td className="table-primary">Symbol</td>
              </tr>
            </thead>
            <tbody>
              {/* {history.length > 0 ? (
            history.map((v, i) => {
              return (
                <tr key={i}>
                  <td>{unixDay(v.Timestamp)}</td>
                  <td>{unixTime(v.Timestamp)}</td>
                  <td
                    className={
                      v.Side === "BUY" ? "text-success" : "text-danger"
                    }
                  >
                    {v.Side}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td> - </td>
              <td> - </td>
              <td> - </td>
            </tr>
          )} */}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};
