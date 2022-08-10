import { combineReducers } from "redux";

import init from "modules/init";
import menu from "modules/menu";
import find from "./find";

const rootReducer = combineReducers({
  init,
  menu,
  find,
});

export default rootReducer;
