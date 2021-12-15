import { combineReducers } from "redux";
import login from "./login-reduce.js";
import listProduct from "./product-reduce"

const rootReducers = combineReducers({
  login,
  listProduct
});

export default rootReducers;
