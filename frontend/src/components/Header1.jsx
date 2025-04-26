import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from '../assets/images/luxureonlogo.jpg';

function NavComp() {
  const navigate = useNavigate();

  // State for authentication and user details
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  // Effect to check login status on mount
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("loggedIn") === "true";
    setIsLoggedIn(isUserLoggedIn);

    if (isUserLoggedIn) {
      const user = localStorage.getItem("user");
      const role = localStorage.getItem("role");
      setUserRole(role || "");
      setUserName(user ? JSON.parse(user).username : "");
    }
  }, []);

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" style={{ background: "#F5C518" }} sticky="top">
      <Container>
        <Navbar.Brand href="/">
          <Image src={logo} alt="Luxureon Logo" width={90} height={60} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {/* Main navigation links */}
          <Nav className="me-auto my-2 my-lg-0">
            {userRole === "admin" ? (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/portfolio">Portfolio</Nav.Link>
                <Nav.Link as={Link} to="/admin">Dashboard</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/portfolio">Portfolio</Nav.Link>
                <Nav.Link as={Link} to="/order">Order</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              </>
            )}
          </Nav>
          {/* Authentication links */}
          <Nav className="ms-auto">
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/profile" className="px-3">
                  Welcome, {userName || "Profile"}
                </Nav.Link>
                <Nav.Link onClick={handleLogout} className="px-3">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="px-3">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className="px-3">
                  SignUp
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavComp;