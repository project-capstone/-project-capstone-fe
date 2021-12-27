import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Col, Form, Row, Spinner } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import swal from "sweetalert"
import allStore from "../../../store/actions"
import "./order.css"
const Order =() =>{
    const groupProductID = useSelector(({groupProductID}) => groupProductID)
    // const [phone, setPhone] = useState("")
    const dispatch = useDispatch()
    const {ID} = useParams()
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({});
    const {phone} = form;
    // const loading = useSelector (({loading}) =>loading)
    const [loading, setLoading] = useState(false);



    
    useEffect(() =>{
        dispatch(allStore.fetchGroupProductID(ID))
        },[dispatch, ID])

    
    const setField = (field, value) => {
          setForm({
           form,
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
          const regexPhone =  /^[0-9]+$/;
          const newErrors = {};
          if (!phone || phone === "") newErrors.phone = "cannot be blank!";
          else if (phone.length <= 10 || phone.length >= 12 ) newErrors.phone = "Invalid phone number!";
          else if (regexPhone.test(phone) === false) newErrors.phone = "Invalid phone number!";
          return newErrors
          }
        
    const navigate = useNavigate();
    const toUser = () =>{
      navigate(`/myorder`)
    }

    const Rupiah = Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });

    const handleOrder = (event) =>{
        event.preventDefault();
        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        }else{
          const token = localStorage.getItem("token");
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };    
          setLoading(true)
            const body ={
                phone
            }
            axios.post(`https://barengin.site/jwt/orders/${ID}`,body, config)
        .then((data) =>{
            swal({
              title: "Success Payment",
                text: `
                    Price          : ${Rupiah.format(data.data.Data.Amount)} 
                    Payment Method : ${data.data.Data.EwalletType}
                    Invoice Number : ${data.data.Data.ExternalId} 
                    `,
                icon: "success",
                button: "Check My Order"
              }).then(function() {
                toUser();
            })
              console.log(data.data.Data)
              

        }).catch((err) =>{
            console.log(err.response.data.Message)
            swal({
                text: err.response.data.Message,
                icon: "error",
              });    
        })
        .finally(() => setLoading(false))
        }
    }    
        
    
      const hargaGroup = (groupProductID.Price) / (groupProductID.Limit)

    if(loading){
      return (
        <div className="LoadingOrderContainer">
              <div className="loadingCenter">

                <h3> <Spinner animation="border" variant="success" /> Loading ... </h3> 
              </div>
               
       </div>
      )
    }
    return(
       <div className="OrderContainer">
           <div className="content">
               <div className="orderDetail">  
               <div className="detail pt-3">

               <h4 style={{color:"#0c6632"}}>Group {groupProductID.NameGroupProduct}</h4>
               <div className="iconDetail my-4">
                   <img src={groupProductID.Url} alt="icon" width="200px" />
               </div>

               <Row>
                    <Col className="ml-2">
                        <Col className="colM">Group Capacity</Col>
                        <Col className="colM">{groupProductID.Name_Product} Price</Col>
                        <Col className="colM">{groupProductID.Name_Product} Group price</Col>
                        <Col className="colM">Admin fee</Col>
                        <Col className="colM"><h6>Total Price</h6></Col>
                    </Col>
                    <Col>
                        <Col className="isiDetail" >{groupProductID.Limit}</Col>
                        <Col className="isiDetail" >{Rupiah.format(groupProductID.Price)}</Col>
                        <Col className="isiDetail" > {Rupiah.format(groupProductID.Price)} / {groupProductID.Limit}</Col>
                        <Col className="isiDetail" >{Rupiah.format(groupProductID.AdminFee)}</Col>
                        <Col className="isiDetail" ><h6>{Rupiah.format(hargaGroup+(groupProductID.AdminFee))}</h6></Col>
                    </Col>
                  </Row>
                  <hr/>
                  <h5>Form Order</h5>
                    <Form >
                  <Row>
                    <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone Number"
                    onChange={(e) => setField("phone", e.target.value.trim())}
                    required
                    isInvalid={!!errors.phone}
                    className="isian"
                  />
                  
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    ex : 08123456789
                    <br />
                    
                  </Form.Text>
                </Form.Group>
            
                    </Col>
                    <Col className="isiDetail">
                    <p>Payment Method</p>
                    <img src="https://1.bp.blogspot.com/-0SdS17Lin94/XzNZG9NtYDI/AAAAAAAAHA8/Bh-7qbPAB1U93mqmtbbXtR2TToLC6XqSgCLcBGAsYHQ/s1000/logo-ovo-pay.png" width="100px" alt="ovo" style={{marginTop:"-10px", marginRight:"10px"}}/>
                    </Col>
                  </Row>
                  <Button variant="success" type="submit" onClick={handleOrder}> Order </Button>
                </Form>
               </div>
               </div>
           </div>
       </div>
    )
}

export default Order