import * as React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

const Topbar: React.FC<any> = () => {
  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      className="justify-content-between mb-4">
      <Navbar.Brand as="span">
        <Link to="/" className="text-white text-decoration-none">
          Social-Media-App
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
      <Nav>
        <Nav.Link as="span">
          <NavLink
            to="/login"
            className="text-white text-decoration-none"
            activeClassName="custom-active">
            Login
          </NavLink>
        </Nav.Link>
        <Nav.Link as="span">
          <NavLink
            to="/signup"
            className="text-white text-decoration-none"
            activeClassName="custom-active">
            Signup
          </NavLink>
        </Nav.Link>
        <Nav.Link>Logout</Nav.Link>
      </Nav>
      {/* </Navbar.Collapse> */}
    </Navbar>
  );
};

export default Topbar;
