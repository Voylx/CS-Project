import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export function useAuthen() {
  const [isAuthen, setIsAuthen] = useState(false);
  const token = localStorage.getItem("token");

  Axios.post(
    "http://localhost:3333/authen",
    {},
    {
      headers: { authorization: "Bearer " + token },
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
