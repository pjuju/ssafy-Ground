/* 액션 타입 */
const SET_SIDE_MENU_IDX = "menu/SET_SIDE_MENU_IDX";
const SET_BOTTOM_MENU_IDX = "menu/SET_BOTTOM_MENU_IDX";

/* 액션 생성 함수 */
export const setSideMenuIdx = (menuIdx) => ({ type: SET_SIDE_MENU_IDX, menuIdx });
export const setBottomMenuIdx = (menuIdx) => ({ type: SET_BOTTOM_MENU_IDX, menuIdx });

/* 초기 상태 */
const initialState = {
  sideMenuIdx: 0,
  bottomMenuIdx: 0,
};

/* 리듀서 */
export default function menu(state = initialState, action) {
  switch (action.type) {
    case SET_SIDE_MENU_IDX:
      return {
        ...state,
        sideMenuIdx: action.menuIdx,
      };
    case SET_BOTTOM_MENU_IDX:
      return {
        ...state,
        bottomMenuIdx: action.menuIdx,
      };
    default:
      return state;
  }
}
