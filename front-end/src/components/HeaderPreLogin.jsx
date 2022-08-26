import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export const HeaderPreLogin = () => {
  const [textColor, setTextColor] = useState("text-white");
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand
          to={"/"}
          as={Link}
          className={`me-auto ${textColor}`}
          onMouseEnter={() => setTextColor("text-primary")}
          onMouseLeave={() => setTextColor("text-white")}
        >
          Crypto-Bot
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};
