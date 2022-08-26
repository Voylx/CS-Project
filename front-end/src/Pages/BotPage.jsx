import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

import { useAuthen } from "../components/Authen";

import { Header } from "../components/Header";

import add from "../icons/add.png";

export const BotPage = () => {
  const isAuthen = useAuthen();

  return (
    <div>
      <Header />
      <Container className="">
        <h1 className="display-1 text-center fw-bold">Cryto-Bot</h1>

        {isAuthen && (
          <>
            <h3>Choose Bot</h3>
            <div>
              <div className="bg-light m-2 p-2 pb-3  rounded">
                <h3>Bot Trade</h3>
                <div
                  className="bg-secondary mx-2 p-2 rounded  d-flex justify-content-center align-items-center"
                  style={{ height: "10rem" }}
                >
                  <img src={add} alt="add" height={"50rem"} className="" />
                </div>
              </div>
              <div className="bg-light m-2 p-2 pb-3  rounded">
                <h3>Bot Line Notification</h3>
                <div
                  className="bg-secondary mx-2 p-2 rounded  d-flex justify-content-center align-items-center"
                  style={{ height: "10rem" }}
                >
                  <img src={add} alt="add" height={"50rem"} className="" />
                </div>
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};
