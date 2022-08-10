/* 액션 타입 */
const SET_LATEST_SEARCH_BOARD = "search/SET_LATEST_SEARCH_BOARD";
const SET_LATEST_SEARCH_USER = "search/SET_LATEST_SEARCH_USER";

/* 액션 생성 함수 */
export const setLatestSearchBoard = (latestBoard) => {
  return {
    type: SET_LATEST_SEARCH_BOARD,
    latestBoard,
  };
};
export const setLatestSearchUser = (latestUser) => ({
  type: SET_LATEST_SEARCH_USER,
  latestUser,
});

/* 초기 상태 */
const initialState = {
  latestBoard: [],
  latestUser: [],
};

/* 리듀서 */
export default function search(state = initialState, action) {
  switch (action.type) {
    case SET_LATEST_SEARCH_BOARD:
      return {
        ...state,
        latestBoard: action.latestBoard,
      };
    case SET_LATEST_SEARCH_USER:
      return {
        ...state,
        latestUser: action.latestUser,
      };
    default:
      return state;
  }
}
