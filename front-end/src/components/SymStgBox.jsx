import React, { useState } from "react";
import Axios from "../services/Axios";
import { Alert, Col, Row } from "react-bootstrap";

import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

import { useNavigate } from "react-router-dom";

const FavIcon = ({ fav, selected, fOnClick }) => {
  return (
    <h5 className="col-4 me-0 mb-0 d-flex justify-content-end">
      <span className="ms-1" onClick={fOnClick.fav[fav]}>
        {fav ? <AiFillStar className="text-warning" /> : <AiOutlineStar />}
      </span>
      <span className="ms-1" onClick={fOnClick.selected[selected]}>
        {selected ? (
          <MdCheckBox className="text-primary" />
        ) : (
          <MdCheckBoxOutlineBlank />
        )}
      </span>
    </h5>
  );
};

const SymStgBox = ({
  sym,
  stg,
  stgID,
  isFav,
  isSelected,
  botData,
  side,
  datetime,
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
        // !selectFav && getsymstgboxdata();
      },
      false: () => {
        //fav false->true
        console.log("fav false->false");
        addFav();
        // !selectFav && getsymstgboxdata();
      },
    },
    selected: {
      true: () => {
        //fav true->false
        console.log("fav true->false");
        delSelected();
        // getsymstgboxdata();
      },
      false: () => {
        //fav false->true
        console.log("fav false->false");
        addSelected();
        // getsymstgboxdata();
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
      .catch((err) => {
        console.error(err);
        alert(err?.response?.data?.message);
      });
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
  function unixTime(unixtime) {
    if (unixtime) {
      var u = new Date(unixtime * 1000);

      return (
        u.getUTCFullYear() +
        "-" +
        ("0" + (u.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + u.getDate()).slice(-2) +
        " : " +
        ("0" + u.getHours()).slice(-2) +
        ":" +
        ("0" + u.getMinutes()).slice(-2) +
        ":" +
        ("0" + u.getSeconds()).slice(-2)
      );
    }
  }
  function timeSince(date) {
    if (!date) return;
    var seconds = Math.floor((new Date() - date * 1000) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }

  return (
    <Col className="">
      <div className="border rounded-3 shadow p-2 mb-1">
        <Row className="">
          <h6 className="col-8">{stg}</h6>

          <FavIcon fav={fav} selected={selected} fOnClick={fOnClick} />
        </Row>
        <div
          onClick={() => navigate(`../symstghistory?sym=${sym}&stgID=${stgID}`)}
        >
          <h6 className="m-0 text-primary">{sym}</h6>
          <p
            className={`m-0 fs-6 ${
              side === "BUY"
                ? "text-success"
                : side === "SELL"
                ? "text-danger"
                : "text-secondary"
            }`}
          >
            {side || "-"}
          </p>

          <p className="m-0 fs-6 text-muted">{unixTime(datetime) || <br />}</p>
          <p className="m-0 fs-6 text-muted">
            {datetime ? `(${timeSince(datetime)})` : <br />}
          </p>
        </div>
      </div>
    </Col>
  );
};

export default SymStgBox;
