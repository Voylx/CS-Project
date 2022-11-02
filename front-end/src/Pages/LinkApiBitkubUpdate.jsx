import React, { useState, useEffect } from "react";
import Axios from "../services/Axios";

import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";

import { useAuthen } from "../services/Authen";

import { Header } from "../components/Header";

export const LinkApiBitkubUpdate = () => {
  let navigate = useNavigate();

  const isAuthen = useAuthen();
  const [key, setKey] = useState("");
  const [secert, setSecert] = useState("");
  const [isError, setisError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  async function handelSaveAPI() {
    if (!key) {
      setisError(true);
      setErrMsg("Please enter API-Keys.");
      return;
    }
    if (!secert) {
      setisError(true);
      setErrMsg("Please enter API-Secert.");
      return;
    }
    if (key && secert) {
      try {
        const res = await Axios.post("/api/update_apibitkub", {
          API_key: key,
          API_secert: secert,
        });

        if (res.data.status == "ok") {
          alert("Update API Success ");
          location = "/bot";
        }
      } catch (error) {
        console.log(error.response.data);
        setisError(true);
        setErrMsg(error.response.data.message);
      }
    }
  }

  return (
    <div>
      <Header />
      <Container fluid="md">
        <Form
          className="border p-3 mx-auto mt-5 col-lg-6 col-md-8 shadow-lg"
          style={{ borderRadius: "11px" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="ms-7 ">Update API BITKUB</h2>
            <h6
              className="me-2 text-secondary c-grab"
              onClick={() => navigate("/bot")}
            >
              {"Go back"}
            </h6>
          </div>

          <Form.Group className="mb-2" controlId="formBasicApiKeys">
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
          </Button>
        </Form>
      </Container>
    </div>
  );
};
