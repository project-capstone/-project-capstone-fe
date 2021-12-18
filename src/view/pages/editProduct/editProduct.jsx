import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
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
  Modal,
} from "react-bootstrap";
import "./editProduct.css";

const EditProduct = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const { name_product, detail_product, price, limit, photo } = form;

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
    // if (!photo || photo === "") newErrors.photo = "cannot be blank!";
    return newErrors;
  };

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

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

  //get data from db
  // const [name_productdb, setname_productdb] = useState();
  // const [detail_productdb, setdetail_productdb] = useState({});
  // const [pricedb, setpricedb] = useState({});
  // const [limitdb, setlimitdb] = useState({});
  // const [photodb, setphotodb] = useState({});

  const [showEdit, setshowEdit] = useState(false);

  const handleCloseEdit = () => setshowEdit(false);
  const handleshowEdit = () => setshowEdit(true);

  const navigate = useNavigate();
  const params = useParams();

  const goToHome = () => {
    navigate(`/`);
  };

  const goToDetail = (ID) => {
    navigate(`/products/${ID}`);
  };

  // const [product, setProduct] = useState({});
  const [foto, setFoto] = useState({});

  useEffect(() => {
    const getAllDataUSer = () => {
      // setLoading(true);
      axios
        .get(`https://barengin.site/products/${params.id}`)
        .then(({ data }) => {
          console.log(data.Data);

          setField("name_product", data.Data.Name_Product);
          setField("detail_product", data.Data.Detail_Product);
          setField("price", data.Data.Price);
          setField("limit", data.Data.Limit);
          setField("photo", data.Data.Url);
          // setFoto(data.Data.Photo);
        })
        .catch((err) => {
          console.log(err.data.Message);
        });
      // .finally(() => {
      //   setLoading(false);
      // });
    };
    getAllDataUSer();
  }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(`https://barengin.site/products/${params.id}`)
  //     .then(({ data }) => {
  //       // console.log(data.data);
  //       setProduct(data.Data);

  //       // setname_productdb(product.Name_Product);
  //       // setdetail_productdb(product.Detail_Product);
  //       // setpricedb(product.Price);
  //       // setlimitdb(product.Limit);
  //       // setphotodb(product.Url);

  //       console.log(name_productdb);
  //       console.log(detail_productdb);
  //       console.log(pricedb);
  //       console.log(limitdb);
  //       console.log(photodb);
  //     })
  //     .catch((err) => {
  //       console.log(err.data.Message);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  const handleCek = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    // Conditional logic:
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      handleshowEdit();
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    // setLoading(true);

    let prices = parseInt(price);
    let limits = parseInt(limit);

    console.log("ini foto", foto);

    // if (!foto || foto === "") {
    //   const objData = {
    //     name_product: name_product,
    //     detail_product: detail_product,
    //     price: prices,
    //     limit: limits,
    //   };

    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //   };

    //   console.log(objData);
    //   console.log(name_product);
    //   console.log(detail_product);
    //   console.log(prices);
    //   console.log(limits);
    // console.log(photo);

    //   axios
    //     .put(
    //       `https://barengin.site//jwt/products/${params.id}`,
    //       objData,
    //       config
    //     )
    //     .then((response) => {
    //       swal({
    //         text: response.data.Message,
    //         icon: "success",
    //       });

    //       goToDetail(`${params.id}`);
    //     })
    //     .catch((err) => {
    //       if (err) {
    //         swal({
    //           text: err.response.data.Message,
    //           icon: "error",
    //         });
    //       } else {
    //         swal.stopLoading();
    //         swal.close();
    //       }
    //     })
    //     .finally(() => setLoading(false));
    // } else {
    const data = new FormData();
    data.append("name_product", name_product);
    data.append("detail_product", detail_product);
    data.append("price", prices);
    data.append("limit", limits);
    data.append("photo", photo);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    console.log(data);
    console.log(name_product);
    console.log(detail_product);
    console.log(prices);
    console.log(limits);
    console.log(photo);

    axios
      .put(`https://barengin.site/jwt/products/${params.id}`, data, config)
      .then((response) => {
        swal({
          text: response.data.Message,
          icon: "success",
        });

        goToDetail(`${params.id}`);
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
    // }
  };

  if (loading) {
    console.log("INI LAGI LOADING!");
    return (
      <Modal
        className="p-5"
        backdrop="static"
        keyboard={false}
        dialogClassName="col-7"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Body className="p-5">
          <div>
            <h3 className="text-center" style={{ color: "#0c6632" }}>
              Loading ...
            </h3>
            <div className="spiner">
              <Spinner animation="border" variant="success" />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  } else {
    return (
      <>
        <div className="BaseContainer">
          <div className="title text-center">
            <h3 style={{ color: "#0c6632" }}>Edit Product</h3>
          </div>
          <div className="editProduct mt-5">
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
                    value={name_product}
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
                    value={detail_product}
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
                    value={limit}
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
                    value={price}
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
              <Col md={6}>
                <div className="row d-flex mt-3 mb-3 justify-content-center align-items-center">
                  <p className="text-center">Current Pict: </p>
                  <br />
                  <img
                    src={photo}
                    style={{
                      width: "auto",
                      height: 300,
                    }}
                  />
                </div>
              </Col>
              <Col md={6}>
                <div className="row d-flex mt-3 mb-3 justify-content-center align-items-center">
                  <p className="text-center">Latest Pict: </p>
                  <br />
                  {selectedFile && (
                    <img
                      src={preview}
                      style={{
                        width: "auto",
                        height: 300,
                      }}
                    />
                  )}
                </div>
              </Col>
              <Form.Group controlId="photo " className="mb-3">
                <Form.Label>Product Picture</Form.Label>
                <Form.Control
                  type="file"
                  placeholder=""
                  accept="image/png, image/jpg, image/jpeg, image/bnp"
                  onChange={(e) => {
                    setFoto(e.target.files[0]);
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

            {/* Button Save Change, Cek */}
            <Row className="d-flex align-items-center justify-content-center">
              <Button
                onClick={handleCek}
                className="confirm mt-3 col-6"
                size="lg"
                width="100%"
                variant="success"
              >
                Save Change
              </Button>
            </Row>
          </div>
        </div>

        {/* Modal Update Product */}
        <Modal
          show={showEdit}
          onHide={handleCloseEdit}
          backdrop="static"
          keyboard={false}
          // size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body className="p-5 d-flex justify-content-center align-items-center">
            <div>
              <p> Are you sure you want to update this product data? </p>

              <div className="divButton mt-5 d-flex justify-content-center align-items-center">
                <Button
                  className="me-2 col-3 btCancel"
                  variant="secondary"
                  onClick={handleCloseEdit}
                >
                  Cancel
                </Button>

                <Button
                  className="col-3 btEdit"
                  variant="success"
                  onClick={handleEdit}
                >
                  Yes
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
};

export default EditProduct;
