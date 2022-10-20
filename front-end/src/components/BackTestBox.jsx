import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Container, Button, Row, Col, Table } from "react-bootstrap";

import { useAuthen } from "../services/Authen";

export const BackTestBox = () => {
  let navigate = useNavigate();
  return (
    <div
      className="border p-3 mx-auto mt-5 col-lg-10 col-md-9 col-sm-9 shadow-lg"
      style={{ borderRadius: "8px" }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-between">
          <h2>EMA-10-21-TF1H</h2>
        </div>
        <h6 className="me-2 text-secondary" onClick={() => navigate(-1)}>
          {"Go back"}
        </h6>
      </div>

      <p className="">Maximum Durtion</p>
      <div className="">
        <Button
          variant="primary"
          type="button"
          className="p-1 mt-0 mb-1 me-2  btn btn-primary  btn-sm"
          onClick={() => window.location.reload()}
        >
          1 mounth
        </Button>
        <Button
          variant="primary"
          type="button"
          className="p-1 mt-0 mb-1 me-2 btn btn-primary  btn-sm"
          onClick={() => window.location.reload()}
        >
          3 mounths
        </Button>
        <Button
          variant="primary"
          type="button"
          className="mt-0 mb-1 me-2 btn btn-primary  btn-sm"
          onClick={() => window.location.reload()}
        >
          6 mounths
        </Button>
        <Button
          variant="primary"
          type="button"
          className="mt-0 mb-1 me-2 btn btn-primary  btn-sm"
          onClick={() => window.location.reload()}
        >
          1 year
        </Button>
        <Button
          variant="primary"
          type="button"
          className="mt-0 mb-1 btn btn-primary  btn-sm"
          onClick={() => window.location.reload()}
        >
          2 years
        </Button>
        <Button
          variant="primary"
          type="button"
          className="mt-0 mb-1 btn btn-primary  btn-sm"
          onClick={() => window.location.reload()}
        >
          3 years
        </Button>
      </div>
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
  );
};
