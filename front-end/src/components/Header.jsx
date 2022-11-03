import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Axios from "../services/Axios";

import { Logout } from "./Logout";

export const Header = () => {
  const [textColor, setTextColor] = useState("text-white");
  const [username, setUsername] = useState("");

  let params = useParams();
  const Bot_Type = params?.botType;

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
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand
          to={"/home"}
          as={Link}
          className={`me-auto ${textColor}`}
          onMouseEnter={() => setTextColor("text-primary")}
          onMouseLeave={() => setTextColor("text-white")}
        >
          Crypto-Bot
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            {/* <Nav.Link href="/home">Home</Nav.Link> */}
            <Nav.Link href="/bot">BOT</Nav.Link>
            {Bot_Type === "1" && (
              <Nav.Link href="/bot/1/Active">History</Nav.Link>
            )}

            <Nav.Link href="/StgInfo">Info</Nav.Link>

            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>{" "}
        </Navbar.Collapse>
        <p className="text-primary mb-0"> {username}</p>
        <Logout />
      </Container>
    </Navbar>
  );
};
