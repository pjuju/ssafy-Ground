import { combineReducers } from "redux";
import init from "modules/init";
import menu from "modules/menu";
import search from "modules/search";

const rootReducer = combineReducers({
  init,
  menu,
  search
});

export default rootReducer;
