import { useReducer, createContext, useContext } from "react";
import { interest, gender, age, location } from "assets/data/initData";
import moment from "moment";

const initialState = {
  standard: 0,
  type: "id",
  word: "",
  date: { radio: "all", startDate: moment(), endDate: moment() },
  category: { radio: "all", values: interest },
  gender: { radio: "all", values: gender },
  age: { radio: "all", values: age },
  location: { radio: "all", values: location },
  boardResult: [],
  userResult: [],
  page: 0,
};

const copyFilters = (filters) => {
  let newValues = [];

  for (let value of filters.values) {
    const clone = Object.assign({}, value);
    if (filters.radio === "all") {
      clone.checked = false;
    }
    newValues.push(clone);
  }

  return { radio: filters.radio, values: newValues };
};

function reducer(state, action) {
  switch (action.type) {
    case "standard":
      return state.standard === 0
        ? { ...state, standard: 1 }
        : { ...state, standard: 0 };
    case "type":
      return { ...state, type: action.value };
    case "word":
      return { ...state, word: action.word };
    case "date":
      return { ...state, date: action.date };
    case "category":
      return {
        ...state,
        category: copyFilters(action.category),
      };
    case "gender":
      return {
        ...state,
        gender: copyFilters(action.gender),
      };
    case "age":
      return {
        ...state,
        age: copyFilters(action.age),
      };
    case "location":
      return {
        ...state,
        location: copyFilters(action.location),
      };
    case "board":
      return {
        ...state,
        boardResult: action.result,
        page: 0,
      };
    case "board-concat":
      return {
        ...state,
        boardResult: state.boardResult.concat(action.result),
      };
    case "page":
      return {
        ...state,
        page: state.page + 1,
      };
    case "user":
      return {
        ...state,
        userResult: action.result,
      };
    default:
      throw new Error();
  }
}

/* search context */
const SearchStateContext = createContext();
const SearchDispatchContext = createContext();

export function SearchProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SearchStateContext.Provider value={state}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
  );
}

/* context custom hook */
export function useSearchState() {
  return useContext(SearchStateContext);
}

export function useSearchDispatch() {
  return useContext(SearchDispatchContext);
}
