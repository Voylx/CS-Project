import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Container, Button, Row, Col, Table } from "react-bootstrap";

import { useAuthen } from "../services/Authen";

export const BackTestDetail = ({ sym, stgID, stgName }) => {
  return (
    <div>
      <p className="">Maximum Durtion</p>
      <div className="">
        <Button
          variant="primary"
          type="button"
          className="p-1 mt-0 mb-1 me-2  btn btn-primary  btn-sm"
          onClick={() => window.location.reload()}
        >
          1 month
        </Button>
        <Button
          variant="primary"
          type="button"
          className="p-1 mt-0 mb-1 me-2 btn btn-primary  btn-sm"
          onClick={() => window.location.reload()}
        >
          3 months
        </Button>
        <Button
          variant="primary"
          type="button"
          className="mt-0 mb-1 me-2 btn btn-primary  btn-sm"
          onClick={() => window.location.reload()}
        >
          6 months
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
          className="mt-0 mb-1 me-2 btn btn-primary  btn-sm"
          onClick={() => window.location.reload()}
        >
          2 years
        </Button>
        <Button
          variant="primary"
          type="button"
          className="mt-0 mb-1 btn me-2 btn-primary  btn-sm"
          onClick={() => window.location.reload()}
        >
          3 years
        </Button>
      </div>
      <div className="p-3">
        <h6>{stgName}</h6>
        <div className="d-flex justify-content-between mt-0">
          <p className="text-secondary ">Symbol</p>
          <p className="text-secondary me-3">Backtest Duration</p>
        </div>{" "}
        <div className="d-flex justify-content-between mt-0">
          <h6>{sym}</h6>
          <p className=" me-3">1 month</p>
        </div>
        <p className="text-secondary">Winning Percentage</p>
        <h6 className="text-success ">12.5%</h6>
        <div className="d-flex justify-content-between">
          <p className="text-secondary me-3">Avarage Winning Trade</p>
          <p className="text-secondary me-3">Avarage Losing Trade</p>
        </div>
        <div className="d-flex justify-content-between">
          <h6 className="text-success me-3">12.5%</h6>
          <h6 className="text-danger me-3">12.5%</h6>
        </div>
        <div className="d-flex justify-content-between">
          <p className="text-secondary">Largest Winning trade</p>
          <p className="text-secondary me-3">Largest Losing Trade</p>
        </div>
        <div className="d-flex justify-content-between">
          <h6 className="text-success ">12.5%</h6>
          <h6 className="text-danger me-3">12.5%</h6>
        </div>
      </div>
    </div>
  );
};
