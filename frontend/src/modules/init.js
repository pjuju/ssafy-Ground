import { interestList } from "components/common/interestList";

/* 액션 타입 */
const SET_IMG = "init/SET_IMG";
const SET_DESC = "init/SEC_DESC";
const TOGGLE_INTEREST = "init/TOGGLE_INTEREST";
const SET_INTEREST_CNT = "init/ADD_INTEREST_CNT";
const SET_INIT_FLAG = "init/SET_INIT_FLAG";

/* 액션 생성 함수 */
export const setImg = (img) => ({ type: SET_IMG, img });
export const setDesc = (desc) => ({ type: SET_DESC, desc });
export const toggleInterest = (id) => ({ type: TOGGLE_INTEREST, id });
export const setInterestCnt = (cnt) => ({ type: SET_INTEREST_CNT, cnt });
export const setInitFlag = (flag) => ({ type: SET_INIT_FLAG, flag });

/* 초기 상태 */
const initialState = {
  img: "",
  desc: "",
  interest: interestList,
  interestCnt: 0,
  initFlag: 0,
};

/* 리듀서 */
export default function init(state = initialState, action) {
  switch (action.type) {
    case SET_IMG:
      return {
        ...state,
        img: action.img,
      };
    case SET_DESC:
      return {
        ...state,
        desc: action.desc,
      };
    case TOGGLE_INTEREST:
      return {
        ...state,
        interest: state.interest.map(
          (item) =>
            item.id === action.id // id가 일치하면
              ? { ...item, isInterested: !item.isInterested } // 해당 종목의 isInterested를 false로 바꾼다.
              : item // 그게 아니라면 그대로 둔다.
        ),
      };
    case SET_INTEREST_CNT:
      return {
        ...state,
        interestCnt: action.cnt,
      };
    case SET_INIT_FLAG:
      return {
        ...state,
        initFlag: action.flag,
      };
    default:
      return state;
  }
}
