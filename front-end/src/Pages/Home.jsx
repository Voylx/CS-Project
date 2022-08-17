import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import { useAuthen } from "../components/Authen";

export const Home = () => {
  const authen = useAuthen();

  return (
    <div>
      <h1>Home</h1>
      <Button
        variant="success"
        type="button"
        className="mx-2"
        as={Link}
        to={"/register"}
      >
        Register
      </Button>
      <Button
        variant="primary"
        type="button"
        className="mx-2"
        as={Link}
        to={"/login"}
      >
        Login
      </Button>
    </div>
  );
};
