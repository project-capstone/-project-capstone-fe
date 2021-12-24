import { useEffect } from "react"
import { Col, Row, Spinner, Table } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import allStore from "../../../store/actions"
import "./user.css"


const User = () =>{
    const loading = useSelector(({loading}) => loading)
    const dispatch = useDispatch()
    const user = useSelector(({user}) => user)
    const {ID} = useParams()
    const userOrder = useSelector(({userOrder}) =>userOrder)


    useEffect(() =>{
        dispatch(allStore.fetchUser(ID))
    },[dispatch, ID])

    useEffect(() =>{
        dispatch(allStore.fetchUserOrder())
    },[dispatch, ])
    console.log(userOrder, "order")
    
    userOrder.sort(function(a,b){
      return parseFloat(b.OrderID) - parseFloat(a.OrderID)
    })

    const Rupiah = Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
  });

    if(loading){
      return(
        <div className="ContainerUser">
                <div className="contentUser">
                    <div className="titleUser">
                    <h3 style={{color:"#0c6632 "}}>Order History</h3>
                    </div>
                    <div className="history">
                    <div className="loadGroup">
                  <h4> <Spinner animation="grow"/>Please Wait ...</h4>

                </div>
                    </div>
                </div>
        </div>
      )
    }
    return(
        <div className="ContainerUser">
                <div className="contentUser">
                    <div className="titleUser">
                    <h3 style={{color:"#0c6632 "}}>Order History</h3>
                    </div>
                    <div className="history">
  
                        <div className="order mt-3">
                        <Table striped bordered hover size="l">
                            <thead>
                              <tr>
                                <th rowSpan={2}className="thTable">No</th>
                                <th rowSpan={2}className="thTable">Date</th>
                                <th rowSpan={2}className="thTable">Invoice Number</th>
                                <th rowSpan={2}className="thTable">Product Name</th>
                                <th rowSpan={2}className="thTable">Price</th>
                                <th colSpan={2} className="text-center">Account</th> 
                              </tr>
                              <tr className="text-center">
                                <th>Email</th>
                                <th >Password</th>
                              </tr>
                            </thead>
                            {userOrder.map((el,i) =>{
                              const email = () =>{
                                if(el.Email === ""){
                                    return(<>Pending</>)
                                }else{return(<>{el.Email}</>)}}

                            const password =() =>{
                                if(el.Password === ""){
                                    return (<>Pending</>)
                                }else{return (<>{el.Password}</>)}}
                              return(
                            <tbody>
                              <tr className="text-center" key={i}>
                                <td>{i+1}</td>
                                <td>{el.Created}</td>
                                <td>{el.ExternalId}</td>
                                <td>{el.NameProduct}</td>
                                <td> {Rupiah.format(el.PriceOrder)}</td>
                                <td>{email()}</td>
                                <td>{password()}</td>
                              </tr>
                            </tbody>
                              )
                            })}
                          </Table>
                        </div>
                        
                    </div>
                </div>
        </div>
    )
}

export default User