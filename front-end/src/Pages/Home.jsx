import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

import { useAuthen } from "../services/Authen";

import { Header } from "../components/Header";
import Banner from "../components/Banner";

export const Home = () => {
  const isAuthen = useAuthen();

  return (
    <div>
      <Header />
      <Banner />

      <Container>
        <h1>Hello</h1>
        {/* <img
          src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          class="img-fluid"
          alt="picture investigation"
        ></img> */}
      </Container>
      {isAuthen && <>Login</>}
    </div>
  );
};
