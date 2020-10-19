import React from "react";
import {Navbar, Nav} from "react-bootstrap";

const Menu = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Library App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/Authors">Authors</Nav.Link>
          <Nav.Link href="/Books">Books</Nav.Link>
          <Nav.Link href="/AddBook">Books</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Menu;
