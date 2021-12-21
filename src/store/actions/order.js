import axios from 'axios'
import swal from 'sweetalert';
import allStore from './index'

export const postOrder = (payload, ID) =>{
    const token = localStorage.getItem("token");
        const config = {
            headers: { Authorization: `Bearer ${token}` },
          };    
       
    return(dispatch) =>{
        dispatch(allStore.setLoading(true))
        axios.post(`https://barengin.site/jwt/orders/${ID}`, payload, config)
        .then((data) =>{
            dispatch(setOrder(data))
            swal({
                text: "Success Payment",
                icon: "success",
              });
            console.log(data)
        }).catch((err) =>{
            console.log(err.response.data.Message)
            swal({
                text: err.response.data.Message,
                icon: "error",
              });
            
        }).finally((_) => dispatch(allStore.setLoading(false)))
    }
}

export const setOrder = (payload) =>{
    return {
        type : "SET_ORDER",
        payload
    }
}