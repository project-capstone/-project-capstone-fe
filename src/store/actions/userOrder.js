import axios from 'axios'
import allStore from './index'

export const fetchUserOrder = () =>{
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
      }; 
    return(dispatch) =>{
        dispatch(allStore.setLoading(true))
        axios.get(`https://barengin.site/jwt/orders/users/`+ localStorage.getItem("ID"), config)
        .then((data) =>{
            console.log("masuk",data.data.Data);
            dispatch(setUserOrder(data.data.Data))
        }).catch((err) =>{
            console.log(err);
        }).finally((_) => dispatch(allStore.setLoading(false)))
    }
}

export const setUserOrder = (payload) =>{
    return {
        type : "SET_ORDER_USER",
        payload,
    }
}