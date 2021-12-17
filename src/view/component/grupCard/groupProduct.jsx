import { Button, Col, Row, Spinner } from "react-bootstrap";
import React, { useEffect, useState} from "react";
import "./groupProduct.css";
import GroupModalProduct from "./modalGroupProduct";
import { useDispatch} from "react-redux";
import { useSelector } from "react-redux";
import allStore from "../../../store/actions";
import { useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";


const GroupProduct =() =>{
    const [modalShow, setModalShow] = React.useState(false);
    const {ProductsID} = useParams()
    const groupProduct = useSelector(({groupProduct}) => groupProduct)
    const dispatch = useDispatch();
    const loading = useSelector (({loading}) =>loading)
    const [load, setLoad] = useState(false)
    const groupUserProduct = useSelector((groupUserProduct) =>groupUserProduct)

    useEffect(() =>{
        dispatch(allStore.fetchUserGroupProduct())
    },[dispatch])

    useEffect(() =>{
        dispatch(allStore.fetchGroupProduct(ProductsID))
    },[dispatch , ProductsID])
    const filterID = groupProduct.filter(item => item.ProductsID === +ProductsID);
    filterID.sort(function(a,b ){
        return parseFloat(b.ID) - parseFloat(a.ID)
    })
    
    const order = filterID.filter(item =>item.GetOrder )
    
  
    const addGroup = () =>{
        const body ={
        }
        const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` },
          };        
        setLoad(true)
        axios.post(`https://barengin.site/jwt/products/group/${ProductsID}`,body,config)
        .then((data) =>{
            console.log(data, "succes")
            swal({
              text:"success add group product",
              icon : "success"});
              setTimeout(() => {
                  window.location.reload()
              }, 800);
          })
        .catch((err) =>{
            console.log(err.response.data)
            swal({
                text:"Please login to continue",
                icon : "error"});  
        })
        .finally((_) => setLoad(false))
    }

    if(load) {
        return (
            <div className="groupProductContainer">
            <div className="groupContent">
                <div className="titleProduct">
                    <Row >
                        <Col className="text-end"><h3>Subscribe Group</h3> </Col>
                        <Col className="text-end"> <Button style={{marginRight:"20px"}} variant="success" onClick={addGroup}>Create New Group</Button></Col>
                    </Row>
                    </div>
                <div className="fieldProduct d-flex flex-wrap justify-content-beetwen">
                <div className="loadGroup">
                <h4> <Spinner animation="grow"/>Please Wait ...</h4>

                </div>
                </div>
            </div>
        </div>
        )
    }
    if(loading) {
        return (
            <div className="groupProductContainer">
            <div className="groupContent">
                <div className="titleProduct">
                    <Row >
                        <Col className="text-end"><h3>Subscribe Group</h3> </Col>
                        <Col className="text-end"> <Button style={{marginRight:"20px"}} variant="success" onClick={addGroup}>Create New Group</Button></Col>
                    </Row>
                    </div>
                <div className="fieldProduct d-flex flex-wrap justify-content-beetwen">
                <div className="loadGroup">
                <h4> <Spinner animation="grow"/>Please Wait ...</h4>

                </div>
                </div>
            </div>
        </div>
        )
    }
    return(
        <>
        <div className="groupProductContainer">
            <div className="groupContent">
                <div className="titleProduct">
                    <Row >
                        <Col className="text-end"><h3>Subscribe Group</h3> </Col>
                        <Col className="text-end"> <Button style={{marginRight:"20px"}} variant="success" onClick={addGroup}>Create New Group</Button></Col>
                    </Row>
                    </div>
                <div className="fieldProduct d-flex flex-wrap justify-content-beetwen">

                    {filterID.map((el, i) => {
                        return (

                    <div className="CardGroup mx-1 my-2" key={i}>
                        <Row>
                            <Col className="imgGroup">
                            <img src={el.Url} alt="img"  style={{marginLeft:"2px"}}/>
                            </Col>
                            <Col>
                            <div className="rounded-pill statusAvaliable">{el.Status}</div>
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
                        <Button variant="success" className="mt-1" style={{width:"100px",}}onClick={() => setModalShow(true)}>Order</Button>
                        </div>
                    </div>
                        )
                            
                        })}
                    <GroupModalProduct
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    />
   
                </div>
            </div>
        </div>
        </>
    )
}

export default GroupProduct