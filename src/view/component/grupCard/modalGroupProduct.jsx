import { useEffect,useState } from "react";
import { Modal,Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./modalGroupProduct.css"

const GroupModalProduct =(props) =>{
  const [detailProduct, setDetailProduct] = useState([])
  const groupProduct = useSelector(({groupProduct}) => groupProduct)
  const {ProductsID} = useParams()

  
  useEffect(() =>{
    setDetailProduct(groupProduct.filter(item => item.ProductsID === +ProductsID))
  },[groupProduct, ProductsID])

  useEffect(() =>{
  // console.log(detailProduct, "detail")
  },[detailProduct])

  const Rupiah = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  let share = ((detailProduct.length >0 &&  detailProduct[0].Price)/(detailProduct.length >0 &&  detailProduct[0].Limit))
  let total = share + (detailProduct.length >0 &&  detailProduct[0].AdminFee)


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
                </div>
            </div>
          </Modal.Body>
        
        

          <Modal.Footer>
            <Button onClick={props.onHide} variant="success">Order</Button>
          </Modal.Footer>
        </Modal>
      );
}

export default GroupModalProduct
  