import React, { useState } from "react";

import { Container, Form, Button } from "react-bootstrap";

export const Register = () => {
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [match, setMatch] = useState(false);

  function checkPass() {
    pass !== confirmPass ? setMatch(false) : setMatch(true);
  }

  return (
    <Container fluid="md">
      <Form
        className="border p-3 mx-auto mt-5 col-lg-6 col-md-8 shadow-lg"
        style={{ borderRadius: "10px" }}
      >
        <h2 className="ms-2">Register</h2>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="userName">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Passwords</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmedPassword">
          <Form.Label>Confirmed Passwords </Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirmed Password"
            onChange={(e) => {
              setConfirmPass(e.target.value);
              checkPass();
            }}
            onBlur={checkPass}
          />
          {!match && <p className="text-danger">❌Password not match</p>}
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className={`mx-2 ${!match && "disabled"}`}
        >
          Confirmed
        </Button>
      </Form>
    </Container>
  );
};

// <Container fluid="sm">Login</Container>
