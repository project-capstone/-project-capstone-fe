import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
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
import Footer from "../../component/footer/footer";
import NavBarApp from "../../component/navbar/NavBarApp";
import "./addProduct.css";

const AddProduct = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const goToHome = () => {
    navigate(`/`);
  };

  const [photo, setFile] = useState();
  const onImageUpload = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const { name_product, detail_product, price, limit } = form;

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
      // data.append("name_product", name_product);
      // data.append("detail_product", detail_product);
      // data.append("price ", price);
      // data.append("limit ", limit);
      data.append("photo", photo);

      const objData = {
        name_product: name_product,
        detail_product: detail_product,
        price: prices,
        limit: limits,
        photo: data,
      };

      console.log(data);
      console.log(name_product);
      console.log(detail_product);
      console.log(prices);
      console.log(limits);
      console.log(photo);

      const config = {
        header: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      axios
        .post("https://barengin.site/jwt/products", objData, config)
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

  return (
    <>
      <NavBarApp />
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
                  onChange={(e) => setField("name_product", e.target.value)}
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
                  onChange={(e) => setField("detail_product", e.target.value)}
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
              <FloatingLabel controlId="floatingLimit" label="Limit">
                <Form.Control
                  type="number"
                  placeholder="Limit"
                  onChange={(e) => setField("limit", e.target.value)}
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
                  onChange={(e) => setField("price", e.target.value)}
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
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Product Picture</Form.Label>
              <Form.Control
                type="file"
                accept="image/jpeg"
                onChange={(e) => onImageUpload(e)}
              />
            </Form.Group>
          </Row>
          <Row className="d-flex align-items-center justify-content-center">
            <Button
              onClick={handleAdd}
              className="confirm mt-3 col-6"
              size="lg"
              width="100%"
            >
              Add Product
            </Button>
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddProduct;
