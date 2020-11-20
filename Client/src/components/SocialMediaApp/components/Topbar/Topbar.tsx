import * as React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

interface IUserData {
  username: string;
  email: string;
}

const userData: IUserData = {
  username: 'JDoe',
  email: 'jdoe@mail.com',
};

const Topbar: React.FC<any> = () => {
  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      className="justify-content-between mb-4">
      <Navbar.Brand>
        <Link to="/" className="text-white text-decoration-none">
          Social-Media-App
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
      <Nav>
        <Nav.Link>
          <NavLink
            to="/login"
            className="text-white text-decoration-none"
            activeClassName="custom-active">
            Login
          </NavLink>
        </Nav.Link>
        <Nav.Link>
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
