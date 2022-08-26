import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

import { useAuthen } from "../components/Authen";

import { Header } from "../components/Header";
export const Home = () => {
  const isAuthen = useAuthen();

  return (
    <div>
      <Header />
      <Container className="">
        <h1 className="display-1 text-center fw-bold">Home</h1>

        {isAuthen && <></>}
      </Container>
    </div>
  );
};
