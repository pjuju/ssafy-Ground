import { combineReducers } from "redux";
import init from "./init";
import menu from "./menu";

const rootReducer = combineReducers({
  init, menu,
});

export default rootReducer;
