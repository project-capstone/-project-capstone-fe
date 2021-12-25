import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import {
  Button,
  InputGroup,
  Form,
  FloatingLabel,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import "./addProduct.css";

const AddProduct = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const goToHome = () => {
    navigate(`/`);
  };

  const { name_product, detail_product, price, limit, photo } = form;

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (field, value) => {
    if (!field || field === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(value);
  };

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
    // name_product errors
    if (!name_product || name_product === "")
      newErrors.name_product = "cannot be blank!";
    // detail_product errors
    if (!detail_product || detail_product === "")
      newErrors.detail_product = "cannot be blank!";
    // price errors
    if (!price || price === "") newErrors.price = "cannot be blank!";
    // limit errors
    if (!limit || limit === "") newErrors.limit = "cannot be blank!";
    else if (limit <= 1) newErrors.limit = "limit cannot be less than 2";
    // else if (limit >= 10) newErrors.limit = "limit cannot be more than 9";
    // photo errors
    if (!photo || photo === "") {
      newErrors.photo = "cannot be blank!";
      setSelectedFile(undefined);
    }

    return newErrors;
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      setLoading(true);

      let prices = parseInt(price);
      let limits = parseInt(limit);

      const data = new FormData();
      data.append("name_product", name_product);
      data.append("detail_product", detail_product);
      data.append("price", prices);
      data.append("limit", limits);
      data.append("photo", photo);

      for (var pair of data.entries()) {
        console.log(pair[0] + " = " + pair[1]);
      }

      console.log(data);
      console.log(name_product);
      console.log(detail_product);
      console.log(prices);
      console.log(limits);
      console.log(photo);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      axios
        .post("https://barengin.site/jwt/products", data, config)
        .then((response) => {
          swal({
            text: response.data.Message,
            icon: "success",
          });

          goToHome();
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

  if (loading) {
    console.log("INI LAGI LOADING!");
    return (
      <div className="LoadingContainer">
        <div className="loadingCenter">
          <h3>
            {" "}
            <Spinner animation="grow" variant="success" /> Loading ...{" "}
          </h3>
        </div>
      </div>
    );
  } else if (localStorage.getItem("role") !== "admin") {
    return <Navigate to="/" />;
  } else {
    return (
      <>
        <div className="BaseContainer">
          <div className="title text-center">
            <h3 style={{ color: "#0c6632" }}>Add New Product</h3>
          </div>
          <div className="newProduct mt-5">
            {/* Product Name */}
            <Row>
              <Col md={12}>
                <FloatingLabel
                  controlId="floatingProductName"
                  label="Product Name"
                >
                  <Form.Control
                    type="text"
                    placeholder="Product Name"
                    onChange={(e) =>
                      setField("name_product", e.target.value.trim())
                    }
                    required
                    isInvalid={!!errors.name_product}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name_product}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>

            {/* Detail Product */}
            <Row>
              <div className="col-12">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Detail Product"
                  className="mb-3 mt-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Detail Product"
                    style={{ height: "150px" }}
                    onChange={(e) =>
                      setField("detail_product", e.target.value.trim())
                    }
                    required
                    isInvalid={!!errors.detail_product}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.detail_product}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </div>
            </Row>

            <Row>
              {/* Limit */}
              <div className="col-12">
                <FloatingLabel controlId="floatingLimit" label="Capacity">
                  <Form.Control
                    type="number"
                    placeholder="Capacity"
                    onChange={(e) => setField("limit", e.target.value.trim())}
                    required
                    isInvalid={!!errors.limit}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.limit}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </div>
            </Row>

            <Row className="d-flex">
              {/* Price */}
              <Col md={12}>
                <InputGroup hasValidation className="mb-3 mt-3">
                  <InputGroup.Text id="inputGroupPrepend">Rp. </InputGroup.Text>
                  {/* <FloatingLabel controlId="floatingLimit" label="Price"> */}
                  <Form.Control
                    type="number"
                    placeholder="Price"
                    onChange={(e) => setField("price", e.target.value.trim())}
                    required
                    isInvalid={!!errors.price}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.price}
                  </Form.Control.Feedback>
                  {/* </FloatingLabel> */}
                </InputGroup>
              </Col>
            </Row>

            {/* Upload File */}
            <Row>
              <div className="d-flex justify-content-center align-items-center">
                {selectedFile && (
                  <img
                    src={preview}
                    alt="preview product"
                    style={{
                      width: "auto",
                      height: 300,
                    }}
                  />
                )}
              </div>

              <Form.Group controlId="photo " className="mb-3">
                <Form.Label>Product Picture</Form.Label>
                <Form.Control
                  type="file"
                  placeholder=""
                  accept="image/png, image/jpg, image/jpeg, image/bnp"
                  onChange={(e) => {
                    setField("photo", e.target.files[0]);
                    onSelectFile(setSelectedFile, e.target.files[0]);
                  }}
                  required
                  isInvalid={!!errors.photo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.photo}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="d-flex align-items-center justify-content-center">
              <Button
                onClick={handleAdd}
                className="confirm mt-3 col-6"
                size="lg"
                width="100%"
                variant="success"
              >
                Add Product
              </Button>
            </Row>
          </div>
        </div>
      </>
    );
  }
};

export default AddProduct;
