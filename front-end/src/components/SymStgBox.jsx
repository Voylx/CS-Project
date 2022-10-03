import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

const FavIcon = ({ fav,check }) => {
  const { fav: isFav, setFav } = fav;
  const { check: isCheck, setCheck } = check;
  return (
    <span className="col-4 me-0 d-flex justify-content-end">
      <span className="ms-1" onClick={() => { setFav(!isFav) }}>
        {isFav ? <AiFillStar /> : <AiOutlineStar />}
      </span>
      <span className="ms-1" onClick={() => { setCheck(!isCheck) }}>
        {isCheck ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
      </span>

    </span>
  );
};

const SymStgBox = ({ sym, stg, i }) => {
  const [fav, setFav] = useState(false);
  const [check, setCheck] = useState(false);
  return (
    <Col className="">
      <div className="border rounded-3 shadow p-2 mb-1 ">
        <Row className="">
          <h6 className="col-8">{stg}</h6>

          <FavIcon fav={{ fav, setFav }} check={{ check, setCheck }} />
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
