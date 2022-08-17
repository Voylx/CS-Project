import React, { useEffect } from "react";
import Axios from "axios";

export function useAuthen() {
  //   useEffect(() => {
  const token = localStorage.getItem("token");
  //   console.log(token);

  Axios.post(
    "http://localhost:3333/authen",
    {},
    {
      headers: { authorization: "Bearer " + token },
    }
  )
    .then((response) => {
      const authen = response.data.status;
      if (authen !== "ok") {
        console.log("token error");
        alert("sestion time out!");
        window.location = "/";
      }
    })
    .catch((err) => console.log(err));
  //   }, []);
}
