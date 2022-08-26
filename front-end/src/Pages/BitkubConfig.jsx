import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";

import { useAuthen } from "../components/Authen";

import { Header } from "../components/Header";

export const BitkubConfig = () => {
  const isAuthen = useAuthen();
  const [key, setKey] = useState("");
  const [secert, setSecert] = useState("");

  function handelSaveAPI() {
    if (key && secert) console.log(key, secert);
  }

  return (
    <div>
      <Header />
      <Container fluid="md">
        <Form
          className="border p-3 mx-auto mt-5 col-lg-6 col-md-8 shadow-lg"
          style={{ borderRadius: "11px" }}
        >
          <h2 className="ms-7 ">API BITKUB</h2>
          <Form.Group className="mb-2" controlId="formBasicApiKeys">
            <Form.Label>API-Keys</Form.Label>
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
            <Form.Label>APISecert</Form.Label>
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
          <Button
            variant="primary"
            type="submit"
            className="mb-2 w-100"
            onClick={handelSaveAPI}
          >
            Save
          </Button>
        </Form>
      </Container>
    </div>
  );
};
