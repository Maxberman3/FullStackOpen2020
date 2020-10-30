import React from "react";
import {Navbar, Nav} from "react-bootstrap";

const Menu = ({token, logout}) => {
  const checkLoggedIn = () => {
    if (!token) {
      return <Nav.Link href="/login">Login</Nav.Link>;
    } else {
      return (
        <Nav.Link href="/" onClick={logout}>
          Logout
        </Nav.Link>
      );
    }
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Library App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/Authors">Authors</Nav.Link>
          <Nav.Link href="/Books">Books</Nav.Link>
          <Nav.Link href="/AddBook">Add Book</Nav.Link>
        </Nav>
        <Nav>{checkLoggedIn()}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Menu;
