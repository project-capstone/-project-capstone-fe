import "./NavBarApp.css";
import { NavDropdown, Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import SignIn from "../signin/signin";
import SignUp from "../signup/signup";

const NavBarApp = () => {
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    localStorage.clear();
  };

  const navbaractionpage = () => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("role") === "customer"
    ) {
      return (
        <>
          <NavDropdown
            title={
              <div className="col">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="40"
                  className=""
                  fill="#0c6632"
                  class="bi bi-person-circle"
                  viewBox="0 -2 15 24"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
                {/* <p style={{ color: "#0c6632" }}> */}
                {localStorage.getItem("name")}
                {/* </p> */}
              </div>
            }
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item>
              {" "}
              <Link
                to="/user"
                style={{ textDecoration: "none", color: "black" }}
              >
                My Profile
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                logout();
              }}
            >
              Logout
            </NavDropdown.Item>
          </NavDropdown>
          <SignIn show={showSignin} onHide={() => setShowSignin(false)} />
          <SignUp show={showSignup} onHide={() => setShowSignup(false)} />
          <SignUp show={showSignup} close={() => setShowSignup(false)} />
          <SignIn show={showSignin} close={() => setShowSignin(false)} />
        </>
      );
    } else if (
      localStorage.getItem("token") &&
      localStorage.getItem("role") === "admin"
    ) {
      return (
        <>
          <NavDropdown
            title={
              <div className="col">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="40"
                  className=""
                  fill="#0c6632"
                  class="bi bi-person-circle"
                  viewBox="0 -2 15 24"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
                {/* <p style={{ color: "#0c6632" }}> */}
                {localStorage.getItem("name")}
                {/* </p> */}
              </div>
            }
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item>
              {" "}
              <Link
                to="/user"
                style={{ textDecoration: "none", color: "black" }}
              >
                My Profile
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              {" "}
              <Link
                to="/addproduct"
                style={{ textDecoration: "none", color: "black" }}
              >
                Add Product
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                logout();
              }}
            >
              Logout
            </NavDropdown.Item>
          </NavDropdown>
          <SignIn show={showSignin} onHide={() => setShowSignin(false)} />
          <SignUp show={showSignup} onHide={() => setShowSignup(false)} />
          <SignUp show={showSignup} close={() => setShowSignup(false)} />
          <SignIn show={showSignin} close={() => setShowSignin(false)} />
        </>
      );
    } else {
      return (
        <>
          <NavDropdown
            title={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="40"
                className=""
                fill="#0c6632"
                class="bi bi-person-circle"
                viewBox="0 -2 15 24"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            }
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item onClick={() => setShowSignin(true)}>
              Sign In
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => setShowSignup(true)}>
              Sign Up
            </NavDropdown.Item>
          </NavDropdown>

          <SignUp show={showSignup} close={() => setShowSignup(false)} />
          <SignIn show={showSignin} close={() => setShowSignin(false)} />
        </>
      );
    }
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="light" className="colorNav">
        <Container>
          <Navbar.Brand href="/" className="title-icon">
            <h2>Barengin</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link href="#product" className="mt mx-3 title-icon">
                Product
              </Nav.Link>
              <Nav.Link href="#deets" className="mt mx-3 title-icon">
                FAQ
              </Nav.Link>

              <div className="nav">
                <div className="user rounded-pill">{navbaractionpage()}</div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default NavBarApp;
