import React from "react";

import { Container, Form, Button } from "react-bootstrap";

export const Login = () => {
  return (
    <Container fluid="md">
      <Form
        className="border p-3 mx-auto mt-5 col-lg-6 col-md-8 shadow-lg"
        style={{ borderRadius: "10px" }}
      >
        <h2 className="ms-2">Login</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit" className="mx-2">
          Login
        </Button>
        <Button variant="success" type="submit" className="mx-2">
          Register
        </Button>
      </Form>
    </Container>
  );
};

// <Container fluid="sm">Login</Container>
