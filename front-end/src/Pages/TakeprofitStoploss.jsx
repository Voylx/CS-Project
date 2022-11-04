import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";

import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Table,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { useAuthen } from "../services/Authen";

import { Header } from "../components/Header";

export default function TakeprofitStoploss() {
  const [showModalCon, setShowModalCon] = useState(false);
  const handleClose = () => setShowModalCon(false);
  let navigate = useNavigate();
  
  const [currencies, setCurrencies] = useState([]);
  useEffect(() => {
    getCurrencies();
    
  }, []);
  function getCurrencies() {
    Axios.get("/symbols")
      .then((res) => {
        setCurrencies(res.data.symbols);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Header />
      <Container fluid="md">
        <div
          className="border p-4 mx-auto mt-5 col-lg-6 col-md-8 shadow-lg"
          style={{ borderRadius: "12px" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h2 className=" ">Take Profit & Stop Loss</h2>
            <h6
              className="me-2 text-secondary c-grab"
              onClick={() => navigate("/bot")}
            >
              {"Go back"}
            </h6>
          </div>
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
          <div>
           
           
            <Form.Group className="mb-1">
          <Form.Label className="fs-5 mt-2">
            Take Profit
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="..."
          />
          <Form.Label className="fs-5 mt-2">
          Stop Loss
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="..."
          />
        </Form.Group>
            <Button
              variant="primary"
              type="button"
              className="mt-1 mb-1 w-100"
              onClick={setShowModalCon}
            >
               ยืนยันการตั้งคำสั่ง
            </Button>
          </div>
        </div>
        <Table className="mt-4 table table-striped table-hover">
            <thead>
              <tr className="text-center">
                <th className="table-primary">Symbols</th>
                <th className="table-secondary">Take Profit's Price</th>
                <th className="table-primary">Stop Loss's Price</th>
                
              </tr>
            </thead>
            <tbody>
              
                  
                    <tr >
                      <td></td>
                      <td></td>
                      <td></td>
                      
                    </tr>
                   
                <tr>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                 
                </tr>
              
            </tbody>
          </Table>

        {/* ModalConfirm*/}

        <Modal show={showModalCon} onHide={handleClose} centered>
          <Modal.Header>
            <Modal.Title>Line Disconnect</Modal.Title>
          </Modal.Header>
          <Modal.Body>คุณต้องการที่จะยกเลิกการเชื่อมต่อใช่หรือไม่ </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              ยกเลิก
            </Button>
            <Button variant="primary">ยืนยัน</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}
