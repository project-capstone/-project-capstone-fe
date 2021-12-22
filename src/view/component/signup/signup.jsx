import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { Button, Modal, Form, FloatingLabel, Spinner } from "react-bootstrap";
import SignIn from "../signin/signin";
import "./signup.css";

const SignUp = (props) => {
  const [showSignin, setShowSignin] = useState(false);
  // const [name, setName] = useState(" ");
  // const [email, setEmail] = useState(" ");
  // const [password, setPassword] = useState(" ");
  // const [phone, setPhone] = useState(" ");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const { name, email, password, phone } = form;

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
    if(loading){
      console.log(loading, "regis")

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
                    onChange={(e) => setField("name", e.target.value.trim())}
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
                    onChange={(e) => setField("email", e.target.value.trim())}
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
                    onChange={(e) =>
                      setField("password", e.target.value.trim())
                    }
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
                    onChange={(e) => setField("phone", e.target.value.trim())}
                    required
                    isInvalid={!!errors.phone}
                  />
                  <Form.Text className="text-muted">
                    format phone : country code + phone number
                    <br />
                    628123456789
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
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