import { useEffect, useState } from "react";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import allStore from "../../../store/actions";
import "./card.css";

const CardProduct = () => {
  // const[loading, setLoading] = useState()
  const loading = useSelector(({ loading }) => loading);
  const dispatch = useDispatch();
  const listProduct = useSelector(({ listProduct }) => listProduct);

  useEffect(() => {
    dispatch(allStore.fetchProduct());
  }, [dispatch]);
    

  const navigate = useNavigate();
  const toNavigate = (ID) => {
    if (localStorage.getItem("role") === "admin") {
      navigate(`/products/${ID}`);
      console.log(ID, "po")
    } else {
      navigate(`/group/${ID}`);
      console.log(ID, "id");
    }
  };
    
   const Rupiah = Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    });
  
    if(loading){
        return(
            <div>
                <div className="product" id="product"><h3 style={{color:"#0c6632"}}>Product</h3> <br/></div>
                <div className="containerCard  d-flex flex-wrap justify-content-beetwen">
                    <div className="loadProduct">
                        <h4> <Spinner animation="grow"/>Please Wait ...</h4>
                    </div>
            </div>
        </div>
        )
    }
    
        return (
            <div className="cardProduct">
                <div className="product" id="product"><h3 style={{color:"#0c6632"}}>Product</h3> <br/></div>
                <div className="containerCard  d-flex flex-wrap justify-content-beetwen">   
                   {listProduct.map((el,i) => (
                            <div className="mx-2 my-3" key={i}>
                    <Card style={{ width: '16rem' }}>
                    <Card.Img variant="top" src={el.Url} className="imgProduct"/>
                    <Card.Body>
                        <Card.Title>{el.Name_Product}</Card.Title>
                        <Card.Text>
                        <Row>
                            <Col md="5">Price</Col>
                            <Col>{Rupiah.format(`${el.Price}`)}</Col>
                            <Col md="5">Capacity</Col>
                            <Col>{el.Limit}</Col>
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