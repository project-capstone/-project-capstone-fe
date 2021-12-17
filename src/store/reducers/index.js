import { combineReducers } from "redux";
import login from "./login-reduce.js";
import listProduct from "./product-reduce"
import groupProduct from "./group-product-reduce.js";
import loading from "./loading-reduce"
import groupUserProduct from "./group-user-product"

const rootReducers = combineReducers({
  login,
  listProduct,
  groupProduct,
  loading,
  groupUserProduct
  
  
});

export default rootReducers;
