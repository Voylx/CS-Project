import React, { useState } from "react";
import Axios from "../services/Axios";
import { Alert, Col, Row } from "react-bootstrap";

import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

import { useNavigate } from "react-router-dom";

const FavIcon = ({ fav, selected, fOnClick }) => {
  return (
    <span className="col-4 me-0 d-flex justify-content-end">
      <span className="ms-1" onClick={fOnClick.fav[fav]}>
        {fav ? <AiFillStar className="text-warning" /> : <AiOutlineStar />}
      </span>
      <span className="ms-1" onClick={fOnClick.selected[selected]}>
        {selected ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
      </span>
    </span>
  );
};

const SymStgBox = ({
  sym,
  stg,
  stgID,
  i,
  isFav,
  isSelected,
  botData,
  getsymstgboxdata,
  selectFav,
}) => {
  let navigate = useNavigate();
  const [fav, setFav] = useState(isFav);
  const [selected, setSelected] = useState(isSelected);

  const fOnClick = {
    fav: {
      true: () => {
        //fav true->false
        console.log("fav true->false");
        delFav();
        !selectFav && getsymstgboxdata();
      },
      false: () => {
        //fav false->true
        console.log("fav false->false");
        addFav();
        !selectFav && getsymstgboxdata();
      },
    },
    selected: {
      true: () => {
        //fav true->false
        console.log("fav true->false");
        delSelected();
        getsymstgboxdata();
      },
      false: () => {
        //fav false->true
        console.log("fav false->false");
        addSelected();
        getsymstgboxdata();
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

  function addSelected() {
    Axios.post("/api/addselected", {
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
          setSelected(!selected);
        }
      })
      .catch((err) => console.error(err));
  }

  function delSelected() {
    Axios.post("/api/delselected", {
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
          setSelected(!selected);
        }
      })
      .catch((err) => console.error(err));
  }

  return (
    <Col className="">
      <div className="border rounded-3 shadow p-2 mb-1 ">
        <Row className="">
          <h6 className="col-8">{stg}</h6>

          <FavIcon fav={fav} selected={selected} fOnClick={fOnClick} />
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
