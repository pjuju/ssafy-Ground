/* 액션 타입 */
const SET_MENU_IDX = "menu/SET_MENU_IDX";

/* 액션 생성 함수 */
export const setMenuIdx = (menuIdx) => ({ type: SET_MENU_IDX, menuIdx });

/* 초기 상태 */
const initialState = {
  menuIdx: 0,
};

/* 리듀서 */
export default function menu(state = initialState, action) {
  switch (action.type) {
    case SET_MENU_IDX:
      return {
        ...state,
        menuIdx: action.menuIdx,
      };
    default:
      return state;
  }
}
