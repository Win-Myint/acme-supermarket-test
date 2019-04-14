import { combineReducers } from "redux";
import product from "./product";
import basket from "./basket";

export default combineReducers({
  product,
  basket
});
