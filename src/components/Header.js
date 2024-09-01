import { useContext, useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

const Header = (props) => {
  const { logout, user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    navigate("/login");
    logout();
    toast.success("Logout success!");
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary bg-light shadow">
        <Container>
          <Navbar.Brand to="/" as={Link}>
            <img
              alt=""
              src="/img/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            React Bootstrap
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {user && user.auth && (
              <>
                <Nav className="me-auto" activeKey={location.pathname}>
                  <Nav.Link to="/" as={Link} eventKey="/">
                    Home
                  </Nav.Link>
                  <Nav.Link to="/users" as={Link} eventKey="/users">
                    List Users
                  </Nav.Link>
                </Nav>
              </>
            )}
            <Nav className="ms-auto" activeKey={location.pathname}>
              {user && user.email && (
                <span className="nav-link">Welcome: {user.email}</span>
              )}
              <NavDropdown title="Auth" id="basic-nav-dropdown">
                {user && user.auth ? (
                  <>
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </>
                ) : (
                  <NavDropdown.Item to="/login" as={Link}>
                    Login
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
