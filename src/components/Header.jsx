import React from 'react';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

class Header extends React.Component {
  render() {
    return (
      <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">CosmicLibrary</Navbar.Brand>
          <Nav className="me-auto">
          <Navbar.Brand><Link to="/" className="nav-link">Home</Link></Navbar.Brand>
          <Navbar.Brand><Link to="/books" className="nav-link">Books</Link></Navbar.Brand>
          <Navbar.Brand><Link to="/about" className="nav-link">About</Link></Navbar.Brand>
                      </Nav>
        </Container>
      </Navbar>
    </>
  );
}
}
export default Header;






      // <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      //   <Navbar.Brand></Navbar.Brand>
      //   <Navbar.Brand></Navbar.Brand>
      //   <NavItem ></NavItem>
      //   
      //   
      // </Navbar>