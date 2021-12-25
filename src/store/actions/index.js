import { postLogin, setLogin } from "./setLogin.js";
import { fetchProduct,setProducts } from "./productList.js";
import setLoading from "./setLoading.js";
import setError from "./setError.js";
import { fetchGroupProduct, setGroupProducts } from "./groupProduct.js";
import { postOrder,setOrder } from "./order.js";
import { fetchGroupProductID, setGroupProductsID } from "./groupProductID.js";
import {fetchUserOrder, setUserOrder} from './userOrder'
import {fetchUser, setUser} from './user'

const allStore = {
    postLogin,
    setLogin,
    setLoading,
    setError,
    fetchProduct,
    setProducts,
    fetchGroupProduct,
    setGroupProducts,
    setOrder,
    postOrder,
    fetchGroupProductID,
    setGroupProductsID,
    fetchUserOrder, 
    setUserOrder,
    fetchUser,
    setUser

  };
  
  export default allStore;
  