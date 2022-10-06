import React, { useState } from "react";
import Axios from "../services/Axios";
import { Alert, Col, Row } from "react-bootstrap";

import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

import { useNavigate } from "react-router-dom";

const FavIcon = ({ fav, check, fOnClick }) => {
  const { fav: isFav, setFav } = fav;
  const { check: isCheck, setCheck } = check;

  return (
    <span className="col-4 me-0 d-flex justify-content-end">
      <span className="ms-1" onClick={fOnClick.fav[isFav]}>
        {isFav ? <AiFillStar /> : <AiOutlineStar />}
      </span>
      <span
        className="ms-1"
        onClick={() => {
          setCheck(!isCheck);
        }}
      >
        {isCheck ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
      </span>
    </span>
  );
};

const SymStgBox = ({ sym, stg, stgID, i, isFav, botData }) => {
  let navigate = useNavigate();
  const [fav, setFav] = useState(isFav);
  const [check, setCheck] = useState(false);

  const fOnClick = {
    fav: {
      true: () => {
        //fav true->false
        // console.log("fav true->false");
        delFav();
      },
      false: () => {
        //fav false->true
        // console.log("fav false->false");
        addFav();
      },
    },
  };

  function addFav() {
    Axios.post("/api/addfav", {
      Bot_id: botData.Bot_id,
      Sym: sym,
      Strategys_Id: stgID,
    })
      .then((res) => {
        if (
          res.data.status === "error" &&
          res.data.message === "Token invalid"
        ) {
          navigate("/");
          throw res.data;
        }
        if (res.data.status === "success") {
          setFav(!fav);
        }
      })
      .catch((err) => console.error(err));
  }

  function delFav() {
    Axios.post("/api/delfav", {
      Bot_id: botData.Bot_id,
      Sym: sym,
      Strategys_Id: stgID,
    })
      .then((res) => {
        if (
          res.data.status === "error" &&
          res.data.message === "Token invalid"
        ) {
          navigate("/");
          throw res.data;
        }
        if (res.data.status === "success") {
          setFav(!fav);
        }
      })
      .catch((err) => console.error(err));
  }

  return (
    <Col className="">
      <div className="border rounded-3 shadow p-2 mb-1 ">
        <Row className="">
          <h6 className="col-8">{stg}</h6>

          <FavIcon
            fav={{ fav, setFav }}
            check={{ check, setCheck }}
            fOnClick={fOnClick}
          />
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
