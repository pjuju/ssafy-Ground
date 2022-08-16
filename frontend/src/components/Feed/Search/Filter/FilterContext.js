import { useReducer, createContext, useContext } from "react";
import moment from "moment";

/* filter reducer */
const initialState = { id: 0, select: false };

const copyFilters = (filters) => {
  const newValues = [];
  for (let value of filters.values) {
    let clone = Object.assign({}, value);
    newValues.push(clone);
  }
  return { radio: filters.radio, values: newValues };
};

function reducer(state, action) {
  switch (action.type) {
    case "title":
      return { ...state, id: action.id };
    case "select":
      return { ...state, select: action.select };
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
    default:
      throw new Error();
  }
}

/* filter context */
const FilterStateContext = createContext();
const FilterDispatchContext = createContext();

export function FilterProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FilterStateContext.Provider value={state}>
      <FilterDispatchContext.Provider value={dispatch}>
        {children}
      </FilterDispatchContext.Provider>
    </FilterStateContext.Provider>
  );
}

/* context custom hook */
export function useFilterState() {
  return useContext(FilterStateContext);
}

export function useFilterDispatch() {
  return useContext(FilterDispatchContext);
}
