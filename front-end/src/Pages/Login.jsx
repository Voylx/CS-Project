import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";

import { HeaderPreLogin } from "../components/HeaderPreLogin";

import CheckLogin from "../services/CheckLogin";

import "../css/line.css";

export const Login = () => {
  let navigate = useNavigate();
  CheckLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setisError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  function handelLogin() {
    Axios.post("/login", {
      email,
      password,
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.status == "ok") {
          localStorage.setItem("token", res.data.token);
          console.log("Login Success!");
          navigate("../home");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setisError(true);
        setErrMsg(
          err?.response?.data?.message ?? "Could not connect to the server."
        );
      });
  }

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      handelLogin();
    }
  };

  useEffect(() => {
    document.title = "Crypto-Bot : Login ";
  }, []);

  return (
    <>
      <HeaderPreLogin />

      <Container fluid="md">
        <Form
          className="border p-3 mx-auto mt-5 col-lg-6 col-md-8 shadow-lg"
          style={{ borderRadius: "11px" }}
        >
          <h2 className="ms-7 ">Login</h2>
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              onKeyPress={handleKeypress}
            />
          </Form.Group>
          {isError && <Alert variant="danger">{errMsg}</Alert>}
          <Button
            variant="primary"
            type="button"
            className="mb-2 w-100"
            onClick={handelLogin}
          >
            Login
          </Button>
          <div className="linetext mb-2 text-muted">&ensp; Or &ensp; </div>
          <Button
            variant="success"
            type="button"
            className="mb-2 w-100"
            as={Link}
            to={"/register"}
          >
            Create New Account
          </Button>
        </Form>
      </Container>
    </>
  );
};
