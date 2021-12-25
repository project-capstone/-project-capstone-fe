import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { Button, Modal, Form, Row, Spinner, InputGroup } from "react-bootstrap";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import SignIn from "../signin/signin";
import "./signup.css";

const SignUp = (props) => {
  const [showSignin, setShowSignin] = useState(false);
  const [loading, setLoading] = useState(false);

  // ---------------------- SHOW PASSWORD -----------------------------------//
  const [passwordShown, setPasswordShown] = useState(false);
  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const toogleChange = () => {
    if (passwordShown) {
      return (
        <FaRegEyeSlash
          id="inlineFormInputGroup"
          // style={{ color: "#0c6632", cursor: "pointer" }}
          style={{ cursor: "pointer" }}
          onClick={() => togglePassword()}
        />
      );
    } else {
      return (
        <FaRegEye
          id="inlineFormInputGroup"
          // style={{ color: "#0c6632", cursor: "pointer" }}
          style={{ cursor: "pointer" }}
          onClick={() => togglePassword()}
        />
      );
    }
  };
  // ---------------------- END - SHOW PASSWORD ------------------------------//

  // ---------------------- FORM + VALIDATION --------------------------------//
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const { name, email, password, phone } = form;

  // SetState Form
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

  // Check Error
  const findFormErrors = () => {
    const newErrors = {};
    const regexEmail =
      // eslint-disable-next-line
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    // name errors
    if (!name || name === "") newErrors.name = "cannot be blank!";
    // email errors
    if (!email || email === "") newErrors.email = "cannot be blank!";
    else if (regexEmail.test(email) === false)
      newErrors.email = "email is not valid!";
    // password errors
    if (!password || password === "") newErrors.password = "cannot be blank!";
    else if (password.length < 6) newErrors.password = "password is too short!";
    // password errors
    if (!phone || phone === "") newErrors.phone = "cannot be blank!";
    else if (phone.length < 6) newErrors.phone = "phone number is too short!";
    // gender errors

    return newErrors;
  };
  // ---------------------- END - FORM + VALIDATION --------------------------------//

  const handleRegister = (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      const body = {
        name,
        email,
        password,
        phone: "+" + phone,
      };
      console.log(name, email, password, phone);

      setLoading(true);

      axios
        .post("https://barengin.site/signup", body)
        .then((data) => {
          console.log(data, "succes");
          props.close();
          swal({
            text: "succes register",
            icon: "success",
          });
        })
        .catch((err) => {
          console.log(err.response.data.Message);
          swal({
            text: err.response.data.Message,
            icon: "error",
          });
        })
        .finally(() => setLoading(false));
    }
  };

  const Modalregister = () => {
    if (loading) {
      console.log(loading, "regis");
      return (
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
              <div className="spiner">
                <Spinner animation="border" variant="success" />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      );
    }
    return (
      <>
        <Modal
          className="modal p-5"
          backdrop="static"
          keyboard={false}
          dialogClassName="col-8"
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
                <Form.Label>
                  Name<sup>*</sup>
                </Form.Label>
                {/* <FloatingLabel label="Name" className="mb-3 mt-3"> */}
                <Form.Control
                  type="text"
                  placeholder="Name"
                  autoComplete="off"
                  onChange={(e) => setField("name", e.target.value.trim())}
                  required
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
                {/* </FloatingLabel> */}
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>
                  Email<sup>*</sup>
                </Form.Label>
                {/* <FloatingLabel label="Email" className="mb-3 mt-3"> */}
                <Form.Control
                  type="email"
                  placeholder="Email"
                  autoComplete="off"
                  onChange={(e) => setField("email", e.target.value.trim())}
                  required
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
                {/* </FloatingLabel> */}
              </Form.Group>

              {/* Form Password */}
              <Form.Group className="mb-2">
                <Form.Label>
                  Password<sup>*</sup>
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    id="inlineFormInputGroup"
                    type={passwordShown ? "text" : "password"}
                    autoComplete="none"
                    onChange={(e) =>
                      setField("password", e.target.value.trim())
                    }
                    placeholder="Password"
                    required
                    isInvalid={!!errors.password}
                  />
                  <InputGroup.Text>{toogleChange()}</InputGroup.Text>

                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Phone Number<sup>*</sup>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone Number ex: 62XXXXXXXXX"
                  autoComplete="off"
                  onChange={(e) => setField("phone", e.target.value.trim())}
                  required
                  isInvalid={!!errors.phone}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
                <h7>format phone : country code + phone number</h7>
                {/* <br />
                <h7>628123456789</h7> */}
              </Form.Group>

              <Row className="d-flex mb-3">
                <h6>
                  <sup>* Required</sup>
                </h6>
              </Row>

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
                  onClick={handleRegister}
                >
                  SignUp
                </Button>
              </div>
              <div className="divLogin mt-3 d-flex justify-content-center align-items-center">
                <p className="me-2">Already have an Account ?</p>
                <p
                  onClick={() => setShowSignin(true) & props.close()}
                  className="toSignIn"
                  style={{ color: "#0c6632" }}
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

  return <>{Modalregister()}</>;
};

export default SignUp;
