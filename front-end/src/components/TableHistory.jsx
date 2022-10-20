import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";

import { useAuthen } from "../services/Authen";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Container, Button, Row, Col, Table } from "react-bootstrap";

export const TableHistory = () => {
  let navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();

  const sym = searchParams.get("sym");
  const stgID = searchParams.get("stgID");
  const [stgName, setStgName] = useState("");
  const [history, setHistory] = useState([]);

  const isAuthen = useAuthen();

  async function getsymstghistory() {
    try {
      const response = await Axios.get(
        `/api/getsymstghistory?Sym=${sym}&Strategy_id=${stgID}`
      );
      const data = response.data;
      setStgName(data.Strategy_name);
      setHistory(data.historys);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getsymstghistory();
    console.log(history);
  }, []);

  function unixTime(unixtime) {
    if (unixtime) {
      var u = new Date(unixtime * 1000);

      return (
        ("0" + u.getHours()).slice(-2) +
        ":" +
        ("0" + u.getMinutes()).slice(-2) +
        ":" +
        ("0" + u.getSeconds()).slice(-2)
      );
    }
  }
  function unixDay(unixtime) {
    if (unixtime) {
      var u = new Date(unixtime * 1000);

      return (
        u.getUTCFullYear() +
        "-" +
        ("0" + (u.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + u.getDate()).slice(-2)
      );
    }
  }
  return (
    <Table className="mt-4 table table-striped table-hover">
      <thead>
        <tr className="">
          <td className="table-primary">Date</td>
          <td className="table-secondary">Time</td>
          <td className="table-primary">Side</td>
        </tr>
      </thead>
      <tbody>
        {history.length > 0 ? (
          history.map((v) => {
            return (
              <tr>
                <td>{unixDay(v.Timestamp)}</td>
                <td>{unixTime(v.Timestamp)}</td>
                <td
                  className={v.Side === "BUY" ? "text-success" : "text-danger"}
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
        )}
      </tbody>
    </Table>
  );
};
