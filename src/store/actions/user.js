import axios from 'axios'
import allStore from './index'

export const fetchUser = () =>{
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}` },
      };    
    return(dispatch) =>{
        dispatch(allStore.setLoading(true))
        axios.get(`https://barengin.site/jwt/users/`+ localStorage.getItem("ID"), config)
        .then((data) =>{
            // console.log("masuk",data.data.Data);
            dispatch(setUser(data.data.Data))
        }).catch((err) =>{
            console.log(err);
        }).finally((_) => dispatch(allStore.setLoading(false)))
    }
}

export const setUser = (payload) =>{
    return {
        type : "SET_USER",
        payload,
    }
}