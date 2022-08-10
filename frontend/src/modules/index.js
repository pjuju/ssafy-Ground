import { combineReducers } from "redux";

import init from "./init";
import menu from "./menu";
import find from "./find";
import search from "modules/search";

const rootReducer = combineReducers({
  init,
  menu,
  find,
  search
});

export default rootReducer;
