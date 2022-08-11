import { interestList } from "components/common/interestList";

const TOGGLE_INTEREST_LIST = "init/TOGGLE_INTEREST_LIST";

export const toggleInterestList = (id) => ({ type: TOGGLE_INTEREST_LIST, id });

const initialState = {
  interestList: interestList,
};

/* 리듀서 */
export default function interest(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_INTEREST_LIST:
      return {
        ...state,
        interestList: state.interestList.map(
          (item) =>
            item.id === action.id // id가 일치하면
              ? { ...item, isInterested: !item.isInterested } // 해당 종목의 isInterested를 false로 바꾼다.
              : item // 그게 아니라면 그대로 둔다.
        ),
      };
    default:
      return state;
  }
}
