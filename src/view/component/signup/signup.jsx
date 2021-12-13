import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import SignIn from "../signin/signin";
import "./signup.css";

const SignUp = (props) => {
  const [showSignin, setShowSignin] = useState(false);

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const { name, email, password, phonenumber } = form;

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
    const newErrors = {};
    const regexEmail =
      // eslint-disable-next-line
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    // name errors
    if (!name || name === "") newErrors.name = "cannot be blank!";
    else if (name.length < 3) newErrors.name = "name is too short!";
    // email errors
    if (!email || email === "") newErrors.email = "cannot be blank!";
    else if (regexEmail.test(email) === false)
      newErrors.email = "email is not valid!";
    // password errors
    if (!password || password === "") newErrors.password = "cannot be blank!";
    else if (password.length < 6) newErrors.password = "password is too short!";
    // password errors
    if (!phonenumber || phonenumber === "")
      newErrors.phonenumber = "cannot be blank!";
    else if (phonenumber.length < 8)
      newErrors.phonenumber = "phone number is too short!";

    return newErrors;
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      const objData = {
        name: name,
        email: email,
        password: password,
        phone: phonenumber,
      };

      console.log(objData);

      // axios
      //   .post("https://barengin.site/signup", objData)
      //   .then((response) => {
      //     console.log(response.message);

      //     swal({
      //       text: response.message,
      //       icon: "success",
      //     });
      //   })
      //   .catch((err) => {
      //     if (err) {
      //       swal("Oh No!", err.message, "error");
      //     } else {
      //       swal.stopLoading();
      //       swal.close();
      //     }
      //   })
      //   .finally(() => {
      //     if (props.close) {
      //       props.close();
      //     }
      //   });
    }
  };

  return (
    <>
      <Modal
        className="modal p-5"
        backdrop="static"
        keyboard={false}
        dialogClassName="col-7"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={props.show}
        cancel={props.close}
      >
        <Modal.Body className="modal-register p-5">
          <div>
            <h3 className="text-center" style={{ color: "#0c6632" }}>
              Create Account
            </h3>
            <Form.Group className="mb-2">
              <FloatingLabel label="Name" className="mb-3 mt-3">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setField("name", e.target.value)}
                  required
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

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
                  placeholder="Password"
                  onChange={(e) => setField("password", e.target.value)}
                  required
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-2">
              <FloatingLabel label="Phone Number" className="mb-3 mt-3">
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  onChange={(e) => setField("phonenumber", e.target.value)}
                  required
                  isInvalid={!!errors.phonenumber}
                />
                <Form.Text className="text-muted">
                  example: +628123456789
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  {errors.phonenumber}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <div className="divButton mt-3 d-flex justify-content-between align-items-center">
              <Button
                className="me-2 col-6 btCancel"
                variant="secondary"
                onClick={props.close}
              >
                Cancel
              </Button>

              <Button
                className="col-6 btSignUp"
                variant="primary"
                onClick={handleSignUp}
              >
                SignUp
              </Button>
            </div>

            <div className="divLogin mt-3 d-flex justify-content-center align-items-center">
              <p className="me-2">Already have an Account ?</p>
              <p
                onClick={() => setShowSignin(true) & props.close()}
                className="toSignIn"
              >
                Sign In
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <SignIn show={showSignin} close={() => setShowSignin(false)} />
    </>
  );
};

export default SignUp;
