import React, { useState } from "react";
import Axios from "../services/Axios";

export function useAuthen() {
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
        alert("sestion time out!");
        localStorage.removeItem("token");
        window.location = "/";
      } else {
        setIsAuthen(true);
      }
    })
    .catch((err) => {
      console.log(err.response.data);
      setIsAuthen(false);
      console.log("token error");
      alert("sestion time out!");
      localStorage.removeItem("token");
      window.location = "/";
    });

  return isAuthen;
}
