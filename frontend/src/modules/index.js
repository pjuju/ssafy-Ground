import { combineReducers } from "redux";
import init from "./init";
import menu from "./menu";
import find from "./find";
import feed from "./feed";


const rootReducer = combineReducers({
  init,
  menu,
  find,
  feed,
});

export default rootReducer;
