import React, { useState } from "react";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
// import axios from "axios";
// import SignUp from "../signup/signup";
import "./signin.css";

const SignIn = (props) => {
  // const [showSignup, setShowSignup] = useState(false);

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const { email, password } = form;

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const findFormErrors = () => {
    const regexEmail =
      // eslint-disable-next-line
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const newErrors = {};
    // email errors
    if (!email || email === "") newErrors.email = "cannot be blank!";
    else if (regexEmail.test(email) === false)
      newErrors.email = "email is not valid!";
    // password errors
    if (!password || password === "") newErrors.password = "cannot be blank!";
    else if (password.length < 4) newErrors.password = "comment is too short!";
    return newErrors;
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      const objData = {
        email: email,
        password: password,
      };

      console.log(objData);
      if (props.close) {
        props.close();
      }

      //   axios
      //     .post("https://barengin.site/login", objData)
      //     .then((response) => {
      //       // const message = response.data.message;
      //       console.log(response.data.Token);
      //       console.log(response.Message);
      //       // console.log(response.data.status);
      //       console.log(response.data.ID);
      //       console.log(response.data.Name);
      //       console.log(response.data.Role);

      //       localStorage.setItem("token", response.data.Token);
      //       localStorage.setItem("id", response.data.ID);
      //       localStorage.setItem("name", response.data.Name);
      //       localStorage.setItem("role", response.data.Role);

      //       if (props.close) {
      //         props.close();
      //       }

      //       alert(response.data.message);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
    }
  };

  return (
    <>
      <Modal
        className="modal"
        backdrop="static"
        keyboard={false}
        dialogClassName="col-7"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={props.show}
      >
        <Modal.Body className="modal-signin p-5">
          <div>
            <h3 className="text-center mb-4">SignIn</h3>
            <Form.Group className="mb-2">
              <FloatingLabel label="Email" className="mb-3 mt-3">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setField("email", e.target.value)}
                  required
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-2">
              <FloatingLabel label="Password" className="mb-3 mt-3">
                <Form.Control
                  type="password"
                  onChange={(e) => setField("password", e.target.value)}
                  placeholder="Password"
                  required
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <div className="divButton mt-4 d-flex justify-content-between align-items-center">
              <Button
                className="me-2 col btCancel"
                variant="secondary"
                onClick={props.close}
              >
                Cancel
              </Button>

              <Button
                className="col btSignIn"
                variant="primary"
                onClick={handleSignIn}
              >
                SignIn
              </Button>
            </div>
            {/* <div className="divSignUp mt-3 d-flex justify-content-center align-items-center">
              <p className="me-2">New User ?</p>
              <p
                onClick={() => setShowSignup(true) & props.close()}
                className="toSignUp"
              >
                Sign Up
              </p>
            </div> */}
          </div>
        </Modal.Body>
      </Modal>

      {/* <SignUp show={showSignup} close={() => setShowSignup(false)} /> */}
    </>
  );
};

export default SignIn;
