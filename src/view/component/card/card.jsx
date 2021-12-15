import { Card,Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./card.css";

const CardProduct = (props) =>{
    const Rupiah = Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    });

    const navigate = useNavigate();
    const toNavigate = (ID) =>{
        navigate(`/group/${ID}`)

    }

    return (
        <div>
            <div className="product" id="product"><h3 style={{color:"#0c6632"}}>Product</h3> <br/></div>
            <div className="containerCard  d-flex flex-wrap justify-content-beetwen">   
               {props.listProduct.map((el,i) => (
                        <div className="mx-2 my-3" key={i}>
                <Card style={{ width: '16rem' }}>
                <Card.Img variant="top" src={el.Url} className="imgProduct"/>
                <Card.Body>
                    <Card.Title>{el.Name_Product}</Card.Title>
                    <Card.Text>
                    <Row>
                        <Col md="5">Price</Col>
                        <Col>{Rupiah.format(`${el.Price}`)}</Col>
                    </Row>
                    </Card.Text>
                    <Button variant="success" onClick={() =>{ toNavigate(el.ID)}}>More Info</Button>
                </Card.Body>
                </Card>
            </div>
               ))}
        </div>
    </div>
    )
}

export default CardProduct