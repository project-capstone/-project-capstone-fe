import { Modal,Button, Row, Col } from "react-bootstrap";
import "./modalGroupProduct.css"

const GroupModalProduct =(props) =>{
    return (
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Netflix
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modalContainer">
                <div className="iconModal">
                <img src="https://awsimages.detik.net.id/visual/2020/06/09/jordan-netflix.jpeg" alt="img" />
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
                        <Col>4</Col>
                        <Col>Rp. 186.000</Col>
                        <Col>Rp. 186.000 / 4 = Rp. 46.500</Col>
                        <Col>Rp. 6500</Col>
                        <Col><h6>Rp. 53.000</h6></Col>
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
  
//   function App() {
//     const [modalShow, setModalShow] = React.useState(false);
  
//     return (
//       <>
//         <Button variant="primary" onClick={() => setModalShow(true)}>
//           Launch vertically centered modal
//         </Button>
  
//         <MyVerticallyCenteredModal
//           show={modalShow}
//           onHide={() => setModalShow(false)}
//         />
//       </>
//     );
//   }
  
//   render(<App />);