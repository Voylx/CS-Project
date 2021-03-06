import React, { useState, useEffect } from "react";
import Axios from "axios";

import { Container, Form, Button } from "react-bootstrap";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [match, setMatch] = useState(false);

  function checkPass() {
    pass !== confirmPass ? setMatch(false) : setMatch(true);
  }

  function regis() {
    if (match) {
      Axios.post("http://localhost:3333/register", {
        email: email,
        username: userName,
        password: pass,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    checkPass();
  }, [confirmPass, pass]);

  return (
    <Container fluid="md">
      <Form
        className="border p-3 mx-auto mt-5 col-lg-6 col-md-8 shadow-lg"
        style={{ borderRadius: "10px" }}
      >
        <h2 className="ms-2">Register</h2>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="userName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            onChange={(event) => {
              setUserName(event.target.value);
            }}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Passwords</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPass(e.target.value);
            }}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmedPassword">
          <Form.Label>Confirmed Passwords </Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirmed Password"
            onChange={(e) => {
              setConfirmPass(e.target.value);
            }}
            required
          />
          {!match && <p className="text-danger">???Password not match</p>}
        </Form.Group>

        <Button
          variant="primary"
          type="button"
          className="mx-2"
          disabled={!match}
          onClick={regis}
        >
          Sign up
        </Button>
      </Form>
    </Container>
  );
};

// <Container fluid="sm">Login</Container>
