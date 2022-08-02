/* 액션 타입 */
const SET_MENU = "menu/SET_MENU";

/* 액션 생성 함수 */
export const setMenu = (menu) => ({ type: SET_MENU, menu });

/* 초기 상태 */
const initialState = {
  menu: 0,
};

/* 리듀서 */
export default function init(state = initialState, action) {
  switch (action.type) {
    case SET_MENU:
      return {
        ...state,
        menu: action.menu,
      };
    default:
      return state;
  }
}
