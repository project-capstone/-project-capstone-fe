import axios from 'axios'
import allStore from './index'

export const fetchGroupProduct = () =>{
    
    return(dispatch) =>{
        dispatch(allStore.setLoading(true))
        axios.get("https://barengin.site/products/group")
        .then((data) =>{
            // console.log("masuk",data.data.Data);
            dispatch(setGroupProducts(data.data.Data))
        }).catch((err) =>{
            console.log(err);
        }).finally((_) => dispatch(allStore.setLoading(false)))
    }
}

export const setGroupProducts = (payload) =>{
    return {
        type : "SET_GROUP_PRODUCTS",
        payload,
    }
}