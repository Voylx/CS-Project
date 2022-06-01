import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

import { Container, Form, Button } from "react-bootstrap";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    Axios.post("http://localhost:3333/login", {
      email,
      password,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Container fluid="md">
      <Form
        className="border p-3 mx-auto mt-5 col-lg-6 col-md-8 shadow-lg"
        style={{ borderRadius: "10px" }}
      >
        <h2 className="ms-2">Login</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
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

        <Button
          variant="primary"
          type="button"
          className="mx-2"
          onClick={login}
        >
          Login
        </Button>
        <Button variant="success" type="button" className="mx-2">
          <Link to="/register" className="text-white text-decoration-none">
            Register
          </Link>
        </Button>
      </Form>
    </Container>
  );
};

// <Container fluid="sm">Login</Container>
