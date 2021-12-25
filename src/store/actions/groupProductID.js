import axios from 'axios'
import allStore from './index'

export const fetchGroupProductID = (ID) =>{
    
    return(dispatch) =>{
        dispatch(allStore.setLoading(true))
        axios.get(`https://barengin.site/products/group/${ID}`)
        .then((data) =>{
            // console.log("masuk",data.data.Data);
            dispatch(setGroupProductsID(data.data.Data))
        }).catch((err) =>{
            console.log(err);
        }).finally((_) => dispatch(allStore.setLoading(false)))
    }
}

export const setGroupProductsID = (payload) =>{
    return {
        type : "SET_GROUP_PRODUCTS_ID",
        payload,
    }
}