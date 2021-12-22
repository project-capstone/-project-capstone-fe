import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import {
  Button,
  Container,
  Image,
  Card,
  Tooltip,
  Modal,
  OverlayTrigger,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";

import { FaRegEdit } from "react-icons/fa";
import "./detailProduct.css";
import { useDispatch, useSelector } from "react-redux";
import allStore from "../../../store/actions";

//detailproduct for admin
const DetailProduct = () => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  const [loading, setLoading] = useState(false);
  const [showDel, setShowDel] = useState(false);

  const handleCloseDel = () => setShowDel(false);
  const handleShowDel = () => setShowDel(true);

  const [product, setProduct] = useState({});

  const groupProduct = useSelector(({groupProduct}) => groupProduct)
  const dispatch = useDispatch();

  const {id} = useParams()
  console.log(id, "aa")


  const params = useParams();
  const navigate = useNavigate();
  const goToEditProfile = (id) => {
    navigate(`/editproducts/${id}`);
  };

  const goToHome = () => {
    navigate(`/`);
  };

  console.log(`${params.id}`);

  const Rupiah = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://barengin.site/products/${params.id}`)
      .then(({ data }) => {
        // console.log(data.data);
        setProduct(data.Data);
        console.log(product);
      })
      .catch((err) => {
        console.log(err.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

// GET GROUP PRODUCT //
  useEffect(() =>{
    dispatch(allStore.fetchGroupProduct(id))
  },[dispatch, id])
console.log(groupProduct, "group")

const filterGroup = groupProduct.filter(item => item.ProductsID === +id)
console.log(filterGroup, "filter")
filterGroup.sort(function(a,b) {
  return parseFloat(b.ID) - parseFloat(a.ID)
})

const order = filterGroup.filter(item =>item.GetOrder )

// GET GROUP PRODUCT //

  const handleDel = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .delete(`https://barengin.site/jwt/products/${params.id}`, config)
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
        <div className="BaseContainer ">
          <div className="detail text-center">
            <h3 style={{ color: "#0c6632" }}>Detail Product</h3>
          </div>

          <div></div>

          <Container className="detail-image d-flex justify-content-center align-items-center">
            <Row>
              <Col xs={6} Col md={12} className="image pb-3">
                <Image
                  src={product.Url}
                  style={{ width: "auto", height: 300 }}
                />
              </Col>
              <Col></Col>
            </Row>
          </Container>
          <Container className="detail-data mt-5 ">
            <Row>
              <Col md={12} className="text-center">
                <Row>
                  <h3>
                    {product.Name_Product}{" "}
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">Edit Product </Tooltip>
                      }
                    >
                      <a
                        style={{ color: "#0c6632", cursor: "pointer" }}
                        onClick={() => goToEditProfile(`${params.id}`)}
                      >
                        <FaRegEdit />
                      </a>
                    </OverlayTrigger>
                  </h3>
                  <h4>
                    Price : {Rupiah.format(`${product.Price}`)} · Limit :{" "}
                    {product.Limit}
                  </h4>
                </Row>
                <Row className="mt-5 mb-5">
                  <h4>Description : </h4>
                  <p>{product.Detail_Product}</p>
                </Row>
              </Col>
            </Row>

            {/* Card For Delete Product */}
            <Row>
              <Card className="cardDel shadow-5 mb-5 col-12 d-flex justify-content-center align-items-center">
                <Card.Body className="col-8 row">
                  <Col className="col-10">
                    <h5>
                      <strong>Delete Product</strong>
                    </h5>
                    <p>
                      By deleting this product, you will lose all data of this
                      product!
                    </p>
                  </Col>
                  <div className="col-2 d-flex justify-content-start align-items-center">
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip-disabled">Are you sure ? </Tooltip>
                      }
                    >
                      <Button
                        className="btDel "
                        onClick={handleShowDel}
                        variant="danger"
                      >
                        {" "}
                        Delete{" "}
                      </Button>
                    </OverlayTrigger>
                  </div>
                </Card.Body>
              </Card>
            </Row>
          </Container>
            
{/* ------------- DETAIL GROUP PRODUCT -------------------- */}
            <div className="groupDetailProduct">
              <div className="containerDetail">
                <h3 style={{textAlign:"center", color: "#0c6632"}}>Subscribe Group</h3>
                  <div className="contentDetail d-flex flex-wrap justify-content-beetwen">

                      {filterGroup.map((el, i) =>{
                        const status =() =>{
                          if(el.Status === "Full"){
                              console.log(el.Status, "aaaaaaaaa")
                              return (
                                  <div className="rounded-pill statusAvaliable" style={{backgroundColor:"red"}}>{el.Status}</div>
                              )
                          }else if(el.Status === "Available"){
                              return(
                                  <div className="rounded-pill statusAvaliable" style={{backgroundColor:"rgba(153, 255, 158, 0.685)"}}>{el.Status}</div>
                              )
                          }
                      }

                        return (

                        <div className="CardGroupDetail mx-1 my-2" key={i}>
                        <Row>
                            <Col className="imgGroup">
                            <img src={el.Url} alt="img"  style={{marginLeft:"2px"}}/>
                            </Col>
                            <Col>
                             {status()}
                            </Col>
                        </Row>
                        <h5 style={{textAlign:"center", paddingTop:"20px"}}>{el.NameGroupProduct}</h5>
                        <hr style={{width:"200px" , margin:"0 auto", marginBottom:"10px"}}/>
                        {order.map((el2,l) =>{
                                        return (
                                        <ul key={l}>  
                                           {el2.GetOrder.map((el3, k) =>{
                                               if(el.ID === el3.GroupProductID){
                                                   return(
                                                       <li className="listuser" key={k}>{el3.Name}</li>
                                                   )
                                               }else{
                                                <li className="listuser" ></li>
                                               }
                                           })}
                                            </ul>   
                                        )
                                        })}
                        <div className="ButtonOrder">
                        <Button variant="success" className="buttonOrder mt-1">INFO</Button>
                        </div>
                        </div>
                        )
                      })}

{/* ------------- DETAIL GROUP PRODUCT -------------------- */}



                  </div>
              </div>
            </div>
        </div>

        {/* Modal Delete Profile */}
        <Modal
          show={showDel}
          onHide={handleCloseDel}
          backdrop="static"
          keyboard={false}
          // size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body className="p-5 d-flex justify-content-center align-items-center">
            <div>
              <p> Are you really.. really sure to delete this product ? </p>

              <div className="divButton mt-5 d-flex justify-content-center align-items-center">
                <Button
                  className="me-2 col-3 btCancel"
                  variant="secondary"
                  onClick={handleCloseDel}
                >
                  Cancel
                </Button>

                <Button
                  className="col-3 btEdit"
                  variant="danger"
                  onClick={handleDel}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
};

export default DetailProduct;
