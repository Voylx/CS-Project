import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Container, Button, Row, Col, Table } from "react-bootstrap";

import { useAuthen } from "../services/Authen";

import { Header } from "../components/Header";

export const SymStgHistory = () => {
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
  }, []);

  return (
    <div>
      <Header />
      <Container fluid="md">
        <div
          className="border p-3 mx-auto mt-5 col-lg-8 col-md-8 shadow-lg"
          style={{ borderRadius: "11px" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="ms-7">{stgName}</h2>
            <h6 className="me-2 text-secondary" onClick={() => navigate(-1)}>
              {"Go back"}
            </h6>
          </div>
          <div className="d-flex  ">
            <h3>{sym}</h3>
            {/* <h4>(open)</h4> */}
          </div>
          {/* <Form.Group className="mb-2" controlId="formBasicApiKeys">
            <Form.Control
              type="UpdateAmount"
              placeholder="แก้ไขจำนวนเงินที่ต้องการให้บอทควบคุม"
              onChange={(event) => {
                setKey(event.target.value);
              }}
              required
            />
          </Form.Group> */}

          <h4>Last Action: Buy</h4>

          <div>
            <Button
              variant="primary"
              type="button"
              className="mt-3 mb-2 w-100"
              onClick={() => window.location.reload()}
            >
              ปิดการแจ้งเตือนกลยุทธ์นี้
            </Button>
          </div>
        </div>
        <div className="mt-4 linetext mb-2 text-muted">
          &ensp; ประวัติการแจ้งเตือนของบอท &ensp;{" "}
        </div>
        <Table className="mt-4 table table-striped table-hover">
          <thead>
            <tr className="">
              <td className="table-primary">Date</td>
              <td className="table-secondary">Time</td>
              <td className="table-primary">Side</td>
              <td className="table-secondary">Symbol</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>09-23-2022</td>
              <td>09:00</td>
              <td>Buy</td>

              <td>BTC</td>
            </tr>
            <tr>
              <td>09-23-2022</td>
              <td>09:00</td>
              <td>Sell</td>

              <td>THB</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
};
