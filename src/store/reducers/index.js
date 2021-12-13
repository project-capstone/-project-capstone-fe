import { combineReducers } from "redux";
import login from "./login-reduce.js";

const rootReducers = combineReducers({
  login,
});

export default rootReducers;
