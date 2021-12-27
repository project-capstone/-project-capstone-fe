import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { Button, Modal, Form, Spinner, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./signin.css";

export let token = "";

const SignIn = (props) => {
  // ---------------------- NAVIGATE -----------------------------------//
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };

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
    else if (password.length < 6) newErrors.password = "password is too short!";
    return newErrors;
  };
  // --------------------- END - FORM + VALIDATION -----------------------------//

  // --------------------------- LOGIN -----------------------------------------//
  const handleSignIn = (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      setLoading(true);
      const objData = {
        email: email,
        password: password,
      };

      axios
        .post("https://barengin.site/login", objData)
        .then((response) => {
          swal({
            text: response.data.Message,
            icon: "success",
          });

          // menyimpan token ke local storage
          if (response.data.Data !== null) {
            localStorage.setItem("token", response.data.Data.Token);
            localStorage.setItem("name", response.data.Data.Name);
            localStorage.setItem("role", response.data.Data.Role);
            localStorage.setItem("ID", response.data.Data.ID);

            if (props.close) {
              props.close();
            }

            goToHome();
          }

          console.log(response.data.Data);
        })
        .catch((err) => {
          if (err) {
            swal({
              text: err.response.data.Message,
              icon: "error",
            });
          } else {
            swal.stopLoading();
            swal.close();
          }
        })
        .finally(() => setLoading(false));
    }
  };
  // ------------------------- END-LOGIN ---------------------------------------//

  if (loading) {
    console.log(loading, "sign in");
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
        <Modal.Body className="modal-signin p-5">
          <div>
            <h3 className="text-center" style={{ color: "#0c6632" }}>
              Login
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
        className="modal"
        backdrop="static"
        keyboard={false}
        dialogClassName="col-8"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={props.show}
      >
        <Modal.Body className="modal-signin p-5">
          <div>
            <h3 className="text-center mb-4">Sign In</h3>
            {/* Form Email */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
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
            </Form.Group>

            {/* Form Password */}
            <Form.Group className="mb-2">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  id="inlineFormInputGroup"
                  type={passwordShown ? "text" : "password"}
                  autoComplete="off"
                  onChange={(e) => setField("password", e.target.value.trim())}
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
                variant="success"
                onClick={handleSignIn}
              >
                SignIn
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignIn;
