import { postLogin, setLogin } from "./setLogin.js";
import { fetchProduct,setProducts } from "./productList.js";
import setLoading from "./setLoading.js";
import setError from "./setError.js";

const allStore = {
    postLogin,
    setLogin,
    setLoading,
    setError,
    fetchProduct,
    setProducts
  };
  
  export default allStore;
  