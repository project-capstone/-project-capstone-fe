import "./NavBarApp.css";
import { NavDropdown, Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import allStore from "../../../store/actions";
import SignIn from "../signin/signin";
import SignUp from "../signup/signup";
import logo from "../../../image/logo.png";

const NavBarApp = () => {
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const { ID } = useParams();
  const dispatch = useDispatch();

  const user = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(allStore.fetchUser(ID));
  }, [dispatch]);
  // console.log(user.ID, "user")

  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
    localStorage.clear();
  };
  const toUser = () => {
    navigate(`/myorder`);
  };

  const navbaractionpage = () => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("role") === "customer"
    ) {
      return (
        <>
          {/* User Name */}
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
                  style={{
                    marginRight: 5,
                  }}
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
                <p
                  style={{
                    color: "#0c6632",
                    display: "contents",
                    marginLeft: 3,
                    paddingLeft: 3,
                  }}
                >
                  {localStorage.getItem("name")}
                </p>
              </div>
            }
            id="collasible-nav-dropdown"
          >
            {/* History User */}
            <NavDropdown.Item
              onClick={() => {
                toUser(ID);
              }}
            >
              My Order
            </NavDropdown.Item>

            {/* Log Out */}
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
            alignRight
            title={
              <div className="col">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="40"
                  fill="#0c6632"
                  class="bi bi-person-circle"
                  viewBox="0 -2 15 24"
                  style={{
                    marginRight: 5,
                  }}
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
                <p
                  style={{
                    color: "#0c6632",
                    display: "contents",
                    marginLeft: 3,
                    paddingLeft: 3,
                  }}
                >
                  {localStorage.getItem("name")}
                </p>
              </div>
            }
            id="collasible-nav-dropdown"
          >
            {/* <NavDropdown.Item>
              {" "}
              <Link
                to="/user"
                style={{ textDecoration: "none", color: "black" }}
              >
                My Profile
              </Link>
            </NavDropdown.Item> */}
            <NavDropdown.Item>
              {" "}
              <Link
                to="/addproduct"
                style={{ textDecoration: "none", color: "black" }}
              >
                Add Product
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              {" "}
              <Link
                to="/alluser"
                style={{ textDecoration: "none", color: "black" }}
              >
                All User
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
                className="d-flex"
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
            <img src={logo} alt="logo" width="200px" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav d-flex">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link href="/" className="mt mx-3 title-icon">
                Product
              </Nav.Link>
              {/* <Nav.Link href="#deets" className="mt mx-3 title-icon">
                FAQ
              </Nav.Link> */}

              <div className="nav d-flex">
                <div className="user rounded-pill d-flex">
                  {navbaractionpage()}
                </div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default NavBarApp;
