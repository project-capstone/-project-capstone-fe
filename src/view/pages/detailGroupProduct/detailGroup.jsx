import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import {
  Button,
  Container,
  Image,
  Card,
  Modal,
  Spinner,
  Row,
  Col,
  Form,
  FloatingLabel,
} from "react-bootstrap";

import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./detailGroup.css";

//detailproduct for admin
const DetailGroupProduct = () => {
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({});
  // const [order, setOrder] = useState({});

  const params = useParams();

  const navigate = useNavigate();
  const goToEditProduct = (id) => {
    navigate(`/editproducts/${id}`);
  };

  // const goToHome = () => {
  //   navigate(`/`);
  // };

  const goToDetailGroup = () => {
    navigate(`/groupproducts/${params.id}`);
  };

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  // ---------------  START - Delete Order  --------------------//
  const [id_order, setIdOrder] = useState(null);

  const [showDel, setShowDel] = useState(false);
  const handleCloseDel = () => {
    setIdOrder(null);
    setShowDel(false);
  };

  const handleShowDel = (id_order) => {
    setIdOrder(id_order);
    setShowDel(true);
  };

  const delOrder = (idx) => {
    // console.log(idx);

    setLoading(true);

    axios
      .delete(`https://barengin.site/jwt/orders/delete/` + idx, config)
      .then((response) => {
        swal({
          text: response.data.Message,
          icon: "success",
        });

        goToDetailGroup();
        handleCloseDel();
      })
      .catch((err) => {
        if (err) {
          swal({
            text: err.response.data.Message,
            icon: "error",
          });
          handleCloseDel();
        } else {
          swal.stopLoading();
          swal.close();
          handleCloseDel();
        }
      })
      .finally(() => setLoading(false));
  };
  // ---------------  END - Delete Order  --------------------//

  // ---------------  START - Update Credential  --------------------//
  const [upCred, setUpCred] = useState(null);
  const [showUp, setShowUp] = useState(false);
  const handleCloseUp = () => {
    setUpCred(null);
    setShowUp(false);
  };

  const handleShowUp = (upCred) => {
    setUpCred(upCred);
    setShowUp(true);
  };

  const [form, setForm] = useState({});
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

  const [errors, setErrors] = useState({});
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

  const updateCred = (idx) => {
    // e.preventDefault();

    // console.log(idx);

    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      setLoading(true);

      // const detail = "Email:" + email + "Password:" + password;
      const objData = {
        email,
        password
      };

      // console.log(objData);

      axios
        .put("https://barengin.site/jwt/orders/update/" + idx, objData, config)
        .then((response) => {
          swal({
            text: response.data.Message,
            icon: "success",
          });

          handleCloseUp();
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
  // ---------------  END - Update Credential  --------------------//

  const Rupiah = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  useEffect(() => {
    if (localStorage.getItem("role") === "admin") {
      setLoading(true);
      axios
        .get(`https://barengin.site/products/group/${params.id}`)
        .then(({ data }) => {
          setProduct(data.Data);
          // setOrder(product.GetOrder);
          // console.log(product.GetOrder);
        })
        .catch((err) => {
          console.log(err.data.Message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div className="LoadingContainer">
        <div className="loadingCenter d-flex justify-content-center align-items-center">
          <h3>
            {" "}
            <Spinner animation="grow" variant="success" />
            Loading ...{" "}
          </h3>
        </div>
      </div>
    );
  } else if (localStorage.getItem("role") !== "admin") {
    return <Navigate to="/" />;
  } else if (product.Status === "Full") {
    return (
      <>
        <div className="BaseContainer ">
          <div className="detail text-center">
            <h3 style={{ color: "#0c6632" }}>Detail Group Product</h3>
          </div>

          <Container className="detail-image d-flex justify-content-center align-items-center">
            {/* Image Product */}
            <Row>
              <Col xs={6} Col md={12} className="image pb-3">
                <Image
                  src={product.Url}
                  style={{ width: "auto", height: 300 }}
                />
              </Col>
            </Row>
          </Container>

          <div
            className="rounded-pill status d-flex justify-content-center align-items-end"
            style={{backgroundColor:"red", color:"white",fontWeight:"500"}}
          >
            {product.Status}
          </div>

          <Container className="detail-data mt-5 ">
            {/* Group Name */}
            <h3 className="text-center">{product.NameGroupProduct}</h3>

            {/* Expired Date */}
            <Row className="mb-3">
              <div className="col-6 text-end">
                <h4>· Expired Date : </h4>
              </div>
              <div className="col-6 text-left">
                <h4>{product.DurationGroup}</h4>
              </div>
            </Row>

            {/* Price */}
            <Row>
              <div className="col-6 text-end">
                <h4>· Price : </h4>
              </div>
              <div className="col-6 text-left">
                <h4>{Rupiah.format(`${product.Price}`)}</h4>
              </div>
            </Row>

            {/* Admin Fee */}
            <Row>
              <div className="col-6 text-end">
                <h4>· Admin Fee : </h4>
              </div>
              <div className="col-6 text-left">
                <h4>{Rupiah.format(`${product.AdminFee}`)}</h4>
              </div>
            </Row>

            {/* Total Price */}
            <Row className="mb-3">
              <div className="col-6 text-end ">
                <h4>· Total Price : </h4>
              </div>
              <div className="col-6 text-left">
                <h4>{Rupiah.format(`${product.TotalPrice}`)}</h4>
              </div>
            </Row>

            {/* Capacity */}
            <Row className="mb-2">
              <div className="col-6 text-end">
                <h4>· Capacity : </h4>
              </div>
              <div className="col-6 text-left">
                <h4>{product.Limit} User</h4>
              </div>
            </Row>

            <div className="d-flex justify-content-center">
              <Card className="col-md-10 col-xs-10 mb-5">
                <Card.Body>
                  <Row>
                    <div className="col-md-2 col-xs-2"></div>
                    <div className="col-md-5 col-xs-5 text-left">
                      <h4>User Name</h4>
                    </div>
                    <div className="col-md-2 col-xs-2 text-center">
                      <h4>Update</h4>
                    </div>

                    {/* Delete Order */}
                    <div className="col-md-2 col-xs-2  text-center">
                      <h4>Delete</h4>
                    </div>

                    <div className="col-md-1 col-xs-1"></div>
                  </Row>

                  {/* Get Order */}
                  {(product.GetOrder || []).map((el, idx) => {
                    return (
                      <Row key={idx} className="mb-1">
                        <div className="col-md-2 col-xs-2 text-end">
                          <h4>{idx + 1}</h4>
                        </div>

                        <div className="col-md-5 col-xs-5">
                          <h4> {el.Name}</h4>
                        </div>

                        <div className="col-md-2 col-xs-2  text-center">
                          <FaRegEdit
                            style={{ color: "#0c6632", cursor: "pointer" }}
                            onClick={() => handleShowUp(el.OrderID)}
                          />
                        </div>

                        {/* Delete Order */}
                        <div className="col-md-2 col-xs-2  text-center">
                          <MdDelete
                            style={{ color: "#0c6632", cursor: "pointer" }}
                            onClick={() => handleShowDel(el.OrderID)}
                          />
                        </div>
                        <div className="col-md-1 col-xs-1"></div>
                      </Row>
                    );
                  })}
                </Card.Body>
              </Card>
            </div>
          </Container>
        </div>

        {/* Delete Order */}
        <Modal
          show={showDel}
          onHide={handleCloseDel}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body className="p-5 d-flex justify-content-center align-items-center">
            <div>
              <p> Are you sure to delete this order ? </p>

              <div className="divButton mt-5 d-flex justify-content-center align-items-center">
                <Button
                  className="me-2 col-4 btCancel"
                  variant="secondary"
                  onClick={handleCloseDel}
                >
                  Cancel
                </Button>

                <Button
                  className="col-4 btEdit"
                  variant="danger"
                  onClick={() => delOrder(id_order)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {/* Update Order */}
        <Modal
          className="modal"
          backdrop="static"
          keyboard={false}
          dialogClassName="col-7"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showUp}
          onHide={handleCloseUp}
        >
          <Modal.Body className="modal-cred p-5">
            <div>
              <h3 className="text-center mb-4">Update Credential</h3>
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
                    onChange={(e) =>
                      setField("password", e.target.value.trim())
                    }
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
                  onClick={handleCloseUp}
                >
                  Cancel
                </Button>

                <Button
                  className="col btSignIn"
                  variant="success"
                  onClick={() => updateCred(upCred)}
                >
                  Update
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <div className="BaseContainer ">
          <div className="detail text-center">
            <h3 style={{ color: "#0c6632" }}>Detail Group Product</h3>
          </div>

          <Container className="detail-image d-flex justify-content-center align-items-center">
            {/* Image Product */}
            <Row>
              <Col xs={6} Col md={12} className="image pb-3">
                <Image
                  src={product.Url}
                  style={{ width: "auto", height: 300 }}
                />
              </Col>
            </Row>
          </Container>

          <div
            className="rounded-pill status d-flex justify-content-center "
            style={{backgroundColor:"rgba(153, 255, 158, 0.685)", fontWeight:"500"}}

          >
            {product.Status}
          </div>

          <Container className="detail-data mt-5 ">
            {/* Group Name */}
            <h3 className="text-center">{product.NameGroupProduct}</h3>

            {/* Expired Date */}
            <Row className="mb-3">
              <div className="col-6 text-end">
                <h4>· Expired Date : </h4>
              </div>
              <div className="col-6 text-left">
                <h4>{product.DurationGroup}</h4>
              </div>
            </Row>

            {/* Price */}
            <Row>
              <div className="col-6 text-end">
                <h4>· Price : </h4>
              </div>
              <div className="col-6 text-left">
                <h4>{Rupiah.format(`${product.Price}`)}</h4>
              </div>
            </Row>

            {/* Admin Fee */}
            <Row>
              <div className="col-6 text-end">
                <h4>· Admin Fee : </h4>
              </div>
              <div className="col-6 text-left">
                <h4>{Rupiah.format(`${product.AdminFee}`)}</h4>
              </div>
            </Row>

            {/* Total Price */}
            <Row className="mb-3">
              <div className="col-6 text-end ">
                <h4>· Total Price : </h4>
              </div>
              <div className="col-6 text-left">
                <h4>{Rupiah.format(`${product.TotalPrice}`)}</h4>
              </div>
            </Row>

            {/* Capacity */}
            <Row className="mb-2">
              <div className="col-6 text-end">
                <h4>· Capacity : </h4>
              </div>
              <div className="col-6 text-left">
                <h4>{product.Limit} User</h4>
              </div>
            </Row>

            <div className="d-flex justify-content-center">
              <Card className="col-md-10 col-xs-10 mb-5">
                <Card.Body>
                  <Row>
                    <div className="col-md-2 col-xs-2"></div>
                    <div className="col-md-5 col-xs-5 text-left">
                      <h4>User Name</h4>
                    </div>
                    <div className="col-md-2 col-xs-2 text-center">
                      <h4>Update</h4>
                    </div>

                    {/* Delete Order */}
                    <div className="col-md-2 col-xs-2  text-center">
                      <h4>Delete</h4>
                    </div>

                    <div className="col-md-1 col-xs-1"></div>
                  </Row>

                  {/* Get Order */}
                  {(product.GetOrder || []).map((el, idx) => {
                    return (
                      <Row key={idx} className="mb-1">
                        <div className="col-md-2 col-xs-2 text-end">
                          <h4>{idx + 1}</h4>
                        </div>

                        <div className="col-md-5 col-xs-5">
                          <h4> {el.Name}</h4>
                        </div>

                        <div className="col-md-2 col-xs-2  text-center">
                          <FaRegEdit
                            style={{ color: "#0c6632", cursor: "pointer" }}
                            onClick={() => handleShowUp(el.OrderID)}
                          />
                        </div>

                        {/* Delete Order */}
                        <div className="col-md-2 col-xs-2  text-center">
                          <MdDelete
                            style={{ color: "#0c6632", cursor: "pointer" }}
                            onClick={() => handleShowDel(el.OrderID)}
                          />
                        </div>
                        <div className="col-md-1 col-xs-1"></div>
                      </Row>
                    );
                  })}
                </Card.Body>
              </Card>
            </div>
          </Container>
        </div>

        {/* Delete Order */}
        <Modal
          show={showDel}
          onHide={handleCloseDel}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body className="p-5 d-flex justify-content-center align-items-center">
            <div>
              <p> Are you sure to delete this order ? </p>

              <div className="divButton mt-5 d-flex justify-content-center align-items-center">
                <Button
                  className="me-2 col-4 btCancel"
                  variant="secondary"
                  onClick={handleCloseDel}
                >
                  Cancel
                </Button>

                <Button
                  className="col-4 btEdit"
                  variant="danger"
                  onClick={() => delOrder(id_order)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {/* Update Order */}
        <Modal
          className="modal"
          backdrop="static"
          keyboard={false}
          dialogClassName="col-8"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showUp}
          onHide={handleCloseUp}
        >
          <Modal.Body className="modal-cred p-5">
            <div>
              <h3 className="text-center mb-4">Update Credential</h3>
              <h3 className="text-center mb-4">can't update! status != Full</h3>

              <div className="divButton mt-4 d-flex justify-content-center align-items-center">
                <Button
                  className="btCancel col-6 "
                  variant="secondary"
                  onClick={handleCloseUp}
                >
                  Cancel
                </Button>

                {/* <Button
                  className="col btSignIn"
                  variant="primary"
                  onClick={() => updateCred(upCred)}
                >
                  Update
                </Button> */}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
};

export default DetailGroupProduct;
