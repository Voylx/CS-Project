import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuthen } from "../services/Authen";
import { Button, Container, Form, Row, Col } from "react-bootstrap";

import { Header } from "../components/Header";

export const ViewerTrade = () => {
  const isAuthen = useAuthen();
  let navigate = useNavigate();
  return (
    <div>
      <Header />
      <div
        className="border p-3 mx-auto mt-5 col-lg-10 col-md-9 col-sm-9 shadow-lg"
        style={{ borderRadius: "8px" }}
      >
        <div className="d-flex justify-content-between ">
          <h2 className="ms-7">Trading View</h2>
          <h6 className="me-2 text-secondary" onClick={() => navigate(-1)}>
            {"Go back"}
          </h6>
        </div>
        <div className="mb-5 ">
          <div className="fs-1">BTC</div>
          <div className="fs-5 text-success">(1.33%)</div>

          <div
            className="h-auto  mx-auto mt-2 shadow-lg text-center"
            style={{ borderRadius: "11px", height: "10rem" }}
          >
            รูป กราฟ
          </div>
        </div>
        <div className="linetext mb-4 text-muted">&ensp;Strategy&ensp;</div>
        <Row className="g-3" xs={2} lg={3} xl={4}>
          {[1, 2, 3, 4].map((i) => {
            return (
              <Col>
                <div
                  className="border rounded-3 shadow p-2"
                  style={
                    {
                      // height: "7rem",
                    }
                  }
                >
                  <h6 className="m-0">CDC-TF1D</h6>
                  <h6 className="m-0 text-primary">BTC</h6>
                  {i % 2 == 0 ? (
                    <p className="m-0 fs-6 text-success">BUY</p>
                  ) : (
                    <p className="m-0 fs-6 text-danger">SELL</p>
                  )}
                  <p className="m-0 fs-6 text-muted">2022-09-05 : 22:43:00</p>
                  <p className="m-0 fs-6 text-muted">(3 days ago) </p>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};
