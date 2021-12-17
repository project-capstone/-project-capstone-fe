import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { Button, Modal, Form, FloatingLabel, Spinner } from "react-bootstrap";
import SignIn from "../signin/signin";
import "./signup.css";

const SignUp = (props) => {
  const [showSignin, setShowSignin] = useState(false);
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [phone, setPhone] = useState(" ");
  const [loading, setLoading] = useState(false);

    const handleRegister = () =>{
      const body ={
        name,
        email,
        password,
        phone
      }
      console.log(name, email,password, phone)

      setLoading(true)
  
      axios.post("https://barengin.site/signup", body)
      .then((data) =>{
        console.log(data, "succes")
        props.close()
        swal({
          text:"succes register",
          icon : "success"});
      })
      .catch((err) =>{
        console.log(err.response.data.Message)
        swal(
          {
            text : err.response.data.Message,
            icon :"error"
          })
      })
      .finally(() =>setLoading(false))
    }

  const Modalregister =() =>{
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
            <Spinner animation="border" variant="success"/>
            </div>
          </div>
        </Modal.Body>
      </Modal>
        )
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
                required
                onChange={(e) => setName(e.target.value.trim())}
                // isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {/* {errors.name} */}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-2">
            <FloatingLabel label="Email" className="mb-3 mt-3">
              <Form.Control
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}

                // isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {/* {errors.email} */}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-2">
            <FloatingLabel label="Password" className="mb-3 mt-3">
              <Form.Control
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}

                // isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {/* {errors.password} */}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-2">
            <FloatingLabel label="Phone Number" className="mb-3 mt-3">
              <Form.Control
                type="text"
                placeholder="Phone Number"
                required
                onChange={(e) => setPhone(e.target.value)}

                // isInvalid={!!errors.phonenumber}
              />
              <Form.Text className="text-muted">
                example: +628123456789
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {/* {errors.phonenumber} */}
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
              >
                Sign In
              </p>
            </div>
          </div>
      </Modal.Body>
    </Modal>
    <SignIn show={showSignin} close={() => setShowSignin(false)} />
    </>
    )
  }  

  return (
    <>
      {Modalregister()}
    </>
  );
};

export default SignUp;
