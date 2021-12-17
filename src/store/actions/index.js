import { postLogin, setLogin } from "./setLogin.js";
import { fetchProduct,setProducts } from "./productList.js";
import setLoading from "./setLoading.js";
import setError from "./setError.js";
import { fetchGroupProduct, setGroupProducts } from "./groupProduct.js";
import { fetchUserGroupProduct,setUserGroupProducts } from "./orderUserGroup.js";

const allStore = {
    postLogin,
    setLogin,
    setLoading,
    setError,
    fetchProduct,
    setProducts,
    fetchGroupProduct,
    setGroupProducts,
    fetchUserGroupProduct,
    setUserGroupProducts
  };
  
  export default allStore;
  