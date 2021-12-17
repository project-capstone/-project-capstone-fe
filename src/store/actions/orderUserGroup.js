import axios from 'axios'
import allStore from './index'

export const fetchUserGroupProduct = () =>{
    
    return(dispatch) =>{
        dispatch(allStore.setLoading(true))
        axios.get("https://barengin.site/products/group")
        .then((data) =>{
            console.log("masuk user",data.data.Data );

            dispatch(setUserGroupProducts(data.data.Data))
        }).catch((err) =>{
            console.log(err);
        }).finally((_) => dispatch(allStore.setLoading(false)))
    }
}

export const setUserGroupProducts = (payload) =>{
    return {
        type : "SET_USER_GROUP_PRODUCTS",
        payload,
    }
}