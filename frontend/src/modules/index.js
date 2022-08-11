import { combineReducers } from "redux";
import init from "./init";
import menu from "./menu";
import find from "./find";
import feed from "./feed";
import interest from "./interest";

const rootReducer = combineReducers({
  init,
  menu,
  find,
  feed,
  interest,
});

export default rootReducer;
