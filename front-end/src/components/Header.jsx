import React from "react";
import Container from "react-bootstrap/Container";
import { Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location = "/";
};

export const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand to={"/home"} as={Link} className="me-auto">
          Crypto-Bot
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* <h1>
          <img src={LogoutLogo} alt="Logout" />
        </h1> */}

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/bot">BOT</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>

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
          </Nav>
        </Navbar.Collapse>
        <Nav.Link
          // href="#link"
          className="text-white"
          onClick={handleLogout}
        >
          Logout
        </Nav.Link>
      </Container>
    </Navbar>
  );
};
