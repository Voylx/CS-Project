import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";
import { Link } from "react-router-dom";

import { Container, Form, Button } from "react-bootstrap";

import { HeaderPreLogin } from "../components/HeaderPreLogin";
import CheckLogin from "../services/CheckLogin";

export const Register = () => {
  CheckLogin();

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [match, setMatch] = useState(false);

  function checkPass() {
    pass !== confirmPass ? setMatch(false) : setMatch(true);
  }

  function regis() {
    if (!(email && userName && pass && confirmPass)) {
      alert("Incompelete Information!");
    } else if (match) {
      Axios.post("/register", {
        email: email,
        username: userName,
        password: pass,
      })
        .then((res) => {
          // console.log(res.data);
          if (res.data.status === "error") alert(res.data.message);
          else if (res.data.status === "ok") {
            alert("Register Success!");
            window.location = "/";
          }
        })
        .catch((err) => {
          console.log(err);
          alert(
            err?.response?.data?.message ?? "Can't register, Please try again!"
          );
          window.location = "/login";
        });
    }
  }

  useEffect(() => {
    document.title = "Crypto-Bot : Register ";
    checkPass();
  }, [confirmPass, pass]);

  return (
    <>
      <HeaderPreLogin />
      <Container fluid="md">
        <Form
          className="border p-3 mx-auto mt-5 col-lg-6 col-md-8 shadow-lg"
          style={{ borderRadius: "10px" }}
        >
          <h2 className="ms-1">Register</h2>
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
            {!match && <p className="text-danger">❌Password not match</p>}
          </Form.Group>
          <Button
            variant="primary"
            type="button"
            className="mb-2 w-100"
            disabled={!match}
            onClick={regis}
          >
            Sign up
          </Button>
          <div className="linetext mb-2 text-muted">
            &ensp; Have an Account?&ensp;
          </div>
          <Button
            variant="success"
            type="button"
            className="mb-2 w-100"
            as={Link}
            to={"/login"}
          >
            Login
          </Button>
        </Form>
      </Container>
    </>
  );
};

// <Container fluid="sm">Login</Container>
