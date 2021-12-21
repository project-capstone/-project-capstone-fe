import { useEffect,useState } from "react";
import { Modal,Button, Row, Col, Form, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import allStore from "../../../store/actions";
import "./modalGroupProduct.css"

const GroupModalProduct =(props) =>{
  const [detailProduct, setDetailProduct] = useState([])
  const groupProduct = useSelector(({groupProduct}) => groupProduct)
  const {ProductsID} = useParams()
  const [phone, setPhone] = useState()
  const loading = useSelector(({loading}) => loading)
  const dispatch = useDispatch()
  const {ID} = useParams()
  console.log(ProductsID, "group")
  console.log(ID, "group")


  useEffect(() =>{
    setDetailProduct(groupProduct.filter(item => item.ProductsID === +ProductsID))
  },[groupProduct, ProductsID])

  useEffect(() =>{
  },[detailProduct])

  const Rupiah = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  let share = ((detailProduct.length >0 &&  detailProduct[0].Price)/(detailProduct.length >0 &&  detailProduct[0].Limit))
  let total = share + (detailProduct.length >0 &&  detailProduct[0].AdminFee)

  const handleOrder = (event) =>{
    event.preventDefault();
    console.log("masuk order", phone)
    dispatch(allStore.postOrder({phone, ProductsID}))
  }

    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            {detailProduct.length >0 &&  detailProduct[0].Name_Product}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modalContainer">
                <div className="iconModal">
                <img src={detailProduct.length >0 &&  detailProduct[0].Url} alt="img" className="imgModal" style={{width:"160px"}}/>
                </div>
                <div className="descModal">
                  <br/>
                  <h5>Detail Price</h5>
                  <Row>
                    <Col>
                        <Col>Group Capacity</Col>
                        <Col>Netflix Price</Col>
                        <Col>Netflix Group price</Col>
                        <Col>Admin fee</Col>
                        <Col><h6>Total Price</h6></Col>
                    </Col>
                    <Col>
                        <Col>{detailProduct.length >0 &&  detailProduct[0].Limit}</Col>
                        <Col>{Rupiah.format(detailProduct.length >0 &&  detailProduct[0].Price)}</Col>
                        <Col>{Rupiah.format(detailProduct.length >0 &&  detailProduct[0].Price)} / {detailProduct.length >0 &&  detailProduct[0].Limit} = {Rupiah.format(share)}</Col>
                        <Col>{Rupiah.format(detailProduct.length >0 &&  detailProduct[0].AdminFee)}</Col>
                        <Col><h6>{Rupiah.format(total)}</h6></Col>
                    </Col>
                  </Row>
                  <hr/>
                  <h5>Form Order</h5>
                  <Row>
                    <Col>
                    <Form >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control 
                          type="text" 
                          placeholder="Input your phone number" 
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)} />
                </Form.Group>
                    </Form>
                    </Col>
                    <Col>
                    <p>Payment Method</p>
                    <img src="https://1.bp.blogspot.com/-0SdS17Lin94/XzNZG9NtYDI/AAAAAAAAHA8/Bh-7qbPAB1U93mqmtbbXtR2TToLC6XqSgCLcBGAsYHQ/s1000/logo-ovo-pay.png" width="100px" style={{marginTop:"-10px"}}/>
                    </Col>
                  </Row>


                </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleOrder} variant="success">Order</Button>
            {/* <Button type="submit" variant="success">Order</Button> */}
          </Modal.Footer>
        </Modal>
      );
}

export default GroupModalProduct
  