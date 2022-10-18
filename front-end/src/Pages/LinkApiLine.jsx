import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";

import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";

import { useAuthen } from "../services/Authen";

import { Header } from "../components/Header";

export const LinkApiLine = () => {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");

  async function getusername() {
    try {
      const res = await Axios.post("/api/getusernames", {});
      setUsername(res.data.username);
    } catch (error) {
      console.error(error?.response?.data);
    }
  }

  useEffect(() => {
    getusername();
  }, [username]);

  return (
    <div>
      <Header />
      <Container fluid="md">
        <Form
          className="border p-3 mx-auto mt-5 col-lg-6 col-md-8 shadow-lg"
          style={{ borderRadius: "11px" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="ms-7 ">Setting API Line</h2>
            <h6
              className="me-2 text-secondary"
              onClick={() => navigate("/bot")}
            >
              {"Go back"}
            </h6>
          </div>
          <Form.Group className="mb-3" controlId="formBasicApiSecertLine">
            <Form.Label>Username: {username}</Form.Label>
          </Form.Group>

          {/* <Form.Group className="mb-2" controlId="formBasicApiKeys">
            <Form.Label>Update API-Keys</Form.Label>
            <Form.Control
              type="apikey"
              placeholder="Enter API-Keys"
              onChange={(event) => {
                setKey(event.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicApiSecert">
            <Form.Label>Update API-Secert</Form.Label>
            <Form.Control
              type="API Secert"
              placeholder="Enter API Secert"
              onChange={(event) => {
                setSecert(event.target.value);
              }}
              required
              //   onKeyPress={handleKeypress}
            />
          </Form.Group>
          {isError && <Alert variant="danger">{errMsg}</Alert>}
          <Button
            variant="primary"
            type="button"
            className="mb-2 w-100"
            onClick={handelSaveAPI}
          >
            Save
          </Button> */}
        </Form>
      </Container>
    </div>
  );
};
