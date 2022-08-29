import React, { useState } from "react";
import Axios from "../services/Axios";
import { useNavigate } from "react-router-dom";

export function useAuthen() {
  const [isAuthen, setIsAuthen] = useState(false);
  const token = localStorage.getItem("token");
  console.log(token);

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
        alert("sestion time out!");
        localStorage.removeItem("token");
        window.location = "/";
      } else {
        setIsAuthen(true);
      }
    })
    .catch((err) => console.log(err));

  return isAuthen;
}
