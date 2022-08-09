import { combineReducers } from "redux";
import init from "modules/init";
import menu from "modules/menu";

const rootReducer = combineReducers({
  init,
  menu,
});

export default rootReducer;
