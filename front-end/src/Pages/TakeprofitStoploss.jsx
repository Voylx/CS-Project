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
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [sym, setSym] = useState("");
  const [tp, setTP] = useState(undefined);
  const [sl, setSL] = useState(undefined);
  const [orders, setOrders] = useState([]);

  const [symDel, setSymDel] = useState("");

  const handleClose = () => setShowModalCon(false);
  const handleCancelClose = () => setShowCancelModal(false);
  let navigate = useNavigate();
  useAuthen();

  function delTPSL() {
    Axios.post("/api/deltpsl", {
      Sym: symDel,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert(err?.response?.data?.message);
      })
      .finally(() => {
        handleCancelClose();

        getTPSL();
      });
  }

  function addTPSL() {
    Axios.post("/api/addtpsl", {
      Sym: sym,
      TP: tp,
      SL: sl,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert(err?.response?.data?.message);
      })
      .finally(() => {
        handleClose();
        getTPSL();
      });
  }

  function getTPSL() {
    Axios.post("/api/gettpsl")
      .then((res) => {
        console.log(res.data.results);
        setOrders(res.data.results);
      })
      .catch((err) => {
        console.error(err);
        // alert(err?.response?.data?.message);
      })
      .finally(() => {
        handleClose();
      });
  }

  const [currencies, setCurrencies] = useState([]);
  useEffect(() => {
    getCurrencies();
    getTPSL();
  }, []);

  useEffect(() => {
    console.log({ sym, tp, sl });
  }, [sl, tp, sym]);

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
                setSym(e.target.value);
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
              <Form.Label className="fs-5 mt-2">Take Profit</Form.Label>
              <Form.Control
                type="number"
                placeholder="..."
                min={0}
                onChange={(e) => {
                  setTP(e.target.value);
                }}
              />
              <Form.Label className="fs-5 mt-2">Stop Loss</Form.Label>
              <Form.Control
                type="number"
                placeholder="..."
                min={0}
                onChange={(e) => {
                  setSL(e.target.value);
                }}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="button"
              className="mt-1 mb-1 w-100"
              onClick={setShowModalCon}
              disabled={!sym || (!tp && !sl)}
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
              <th className="table-secondary"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((v, i) => {
              return (
                <tr key={i}>
                  <td>{v.Sym}</td>
                  <td>{v.TP || "-"}</td>
                  <td>{v.SL || "-"}</td>
                  <td
                    className="text-danger"
                    onClick={() => {
                      setShowCancelModal(true);
                      setSymDel(v.Sym);
                    }}
                  >
                    Cancel
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        {/* ModalConfirm*/}

        <Modal show={showModalCon} onHide={handleClose} centered>
          <Modal.Header>
            <Modal.Title>Confrim Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            คุณยืนยันที่จะขาย {sym} <br />
            {tp && <> เมื่อราคาขี้นไปถึง {tp} บาท </>}
            {tp && sl && (
              <>
                หรือ <br />{" "}
              </>
            )}
            {sl && (
              <>
                เมื่อราคาลงมาถึง {sl} บาท
                <br />
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              ยกเลิก
            </Button>
            <Button variant="primary" onClick={addTPSL}>
              ยืนยัน
            </Button>
          </Modal.Footer>
        </Modal>

        {/* ยกเลิกการสั่ง TP&SL */}
        <Modal show={showCancelModal} onHide={handleCancelClose} centered>
          <Modal.Header>
            <Modal.Title>Cancel Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            คุณต้องที่จะยกเลิกการขาย {symDel} <br />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelClose}>
              ยกเลิก
            </Button>
            <Button variant="primary" onClick={delTPSL}>
              ยืนยัน
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}
