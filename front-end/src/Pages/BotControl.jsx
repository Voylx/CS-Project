import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";

import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Alert,
  Row,
  Col,
  Table,
  Tab,
} from "react-bootstrap";

import { useAuthen } from "../services/Authen";

import { Header } from "../components/Header";

export const BotContorl = () => {
  let navigate = useNavigate();

  const isAuthen = useAuthen();

  return (
    <div>
      <Header />
      <Container fluid="md">
        <div
          className="border p-3 mx-auto mt-5 col-lg-8 col-md-8 shadow-lg"
          style={{ borderRadius: "11px" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="ms-7">Name strategies</h2>
            <h6 className="me-2 text-secondary" onClick={() => navigate(-1)}>
              {"Go back"}
            </h6>
          </div>
          <div className="d-flex  ">
            <h3>BTC </h3>
            <h4>(open)</h4>
          </div>
          <h4>จำนวนเงินที่บอทคุม : 200 THB</h4>
          <Form.Group className="mb-2" controlId="formBasicApiKeys">
            <Form.Control
              type="UpdateAmount"
              placeholder="แก้ไขจำนวนเงินที่ต้องการให้บอทควบคุม"
              onChange={(event) => {
                setKey(event.target.value);
              }}
              required
            />
          </Form.Group>
          <h4>Amount:</h4>
          <h6>00.00 THB : 0.0033405 BTC</h6>
          <h4>Recent Side : Buy</h4>

          <div>
            <Button
              variant="primary"
              type="button"
              className="mt-3 mb-2 w-100"
              onClick={() => window.location.reload()}
            >
              บันทึกการแก้ไขจำนวนเงินควบคุม
            </Button>
          </div>
        </div>
        <div className="mt-4 linetext mb-2 text-muted">
          &ensp; ประวัติการซื้อขายของบอท &ensp;{" "}
        </div>
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
            <tr>
              <td>09-23-2022</td>
              <td>09:00</td>
              <td>Buy</td>
              <td>0.0033405</td>
              <td>BTC</td>
            </tr>
            <tr>
              <td>09-23-2022</td>
              <td>09:00</td>
              <td>Sell</td>
              <td>200</td>
              <td>THB</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
};
