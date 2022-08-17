import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { Container, Form, Button } from "react-bootstrap";

export const Login = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setisError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  async function login() {
    try {
      const res = await Axios.post("http://localhost:3333/login", {
        email,
        password,
      });
      console.log(res.data);
      if (res.data.status == "error") {
        setisError(true);
        setErrMsg(res.data.message);
      } else if (res.data.status == "ok") {
        localStorage.setItem("token", res.data.token);

        console.log("Success!");

        navigate("../home", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container fluid="md">
      <Form
        className="border p-3 mx-auto mt-5 col-lg-7 col-md-8 shadow-lg"
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
          />
        </Form.Group>
        {isError && (
          <div className="alert alert-danger p-2" role="alert">
            {errMsg}
          </div>
        )}
        <Button
          variant="primary"
          type="button"
          className="mb-2 w-100"
          onClick={login}
        >
          Login
        </Button>
        <Button
          variant="success"
          type="button"
          className="mb-2 w-100"
          as={Link}
          to={"/register"}
        >
          Register
        </Button>
      </Form>
    </Container>
  );
};

// <Container fluid="sm">Login</Container>
