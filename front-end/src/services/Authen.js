import React, { useState } from "react";
import Axios from "../services/Axios";
import { useNavigate } from "react-router-dom";

export function useAuthen() {
  let navigate = useNavigate();

  const [isAuthen, setIsAuthen] = useState(false);
  const token = localStorage.getItem("token");

  Axios.post(
    "/authen",
    {},
    {
      headers: { Authorization: "Bearer " + token },
    }
  )
    .then((response) => {
      const status = response.data.status;
      if (status !== "ok") {
        setIsAuthen(false);
        console.log("token error");
        navigate("/");
        localStorage.removeItem("token");
        alert("sestion time out!");
      } else {
        setIsAuthen(true);
      }
    })
    .catch((err) => {
      console.log(err.response.data);
      // setIsAuthen(false);
      // console.log("token error");
      // alert("sestion time out!");
      // localStorage.clear();
      // window.location = "/";
    });

  return isAuthen;
}
