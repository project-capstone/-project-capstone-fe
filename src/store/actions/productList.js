import axios from 'axios'
import allStore from './index'

export const fetchProduct = () =>{
    
    return(dispatch) =>{
        dispatch(allStore.setLoading(true))
        axios.get("https://barengin.site/products")
        .then((data) =>{
            console.log("masuk",data.data.Data);
            dispatch(setProducts(data.data.Data))
        }).catch((err) =>{
            console.log(err);
        }).finally((_) => dispatch(allStore.setLoading(false)))
    }
}

export const setProducts = (payload) =>{
    return {
        type : "SET_PRODUCTS",
        payload,
    }
}