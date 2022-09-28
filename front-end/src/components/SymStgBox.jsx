import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const FavIcon = () => {
  return (
    <div className="col">
      <AiOutlineStar />
    </div>
  );
};

const SymStgBox = ({ sym, stg, i }) => {
  const [fav, setFav] = useState(false);
  return (
    <Col className="">
      <div className="border rounded-3 shadow p-2 mb-1 ">
        <Row>
          <h6 className="col">{stg}</h6>

          <FavIcon />
        </Row>
        <h6 className="m-0 text-primary">{sym}</h6>
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
};

export default SymStgBox;
