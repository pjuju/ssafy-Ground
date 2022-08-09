import { combineReducers } from "redux";
import init from "./init";
import menu from "./menu";
import find from "./find";


const rootReducer = combineReducers({
  init,
  menu,
  find,
});

export default rootReducer;
