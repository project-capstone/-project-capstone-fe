import { combineReducers } from "redux";
import login from "./login-reduce.js";
import listProduct from "./product-reduce"
import groupProduct from "./group-product-reduce.js";

const rootReducers = combineReducers({
  login,
  listProduct,
  groupProduct
});

export default rootReducers;
