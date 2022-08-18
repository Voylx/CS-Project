import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import { useAuthen } from "../components/Authen";

import { Header } from "../components/Header";
export const Home = () => {
  const isAuthen = useAuthen();

  return (
    <div>
      <Header />
      <h1>Home</h1>
      {isAuthen && (
        <>
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
        </>
      )}
    </div>
  );
};
