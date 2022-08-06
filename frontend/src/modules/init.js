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
  interest: [
    { id: 1, value: "헬스", isInterested: false },
    { id: 2, value: "요가", isInterested: false },
    { id: 3, value: "필라테스", isInterested: false },
    { id: 4, value: "러닝", isInterested: false },
    { id: 5, value: "홈트레이닝", isInterested: false },
    { id: 6, value: "축구", isInterested: false },
    { id: 7, value: "야구", isInterested: false },
    { id: 8, value: "농구", isInterested: false },
    { id: 9, value: "테니스", isInterested: false },
    { id: 10, value: "배드민턴", isInterested: false },
    { id: 11, value: "등산", isInterested: false },
    { id: 12, value: "수영", isInterested: false },
    { id: 13, value: "골프", isInterested: false },
    { id: 14, value: "볼링", isInterested: false },
    { id: 15, value: "자전거/사이클", isInterested: false },
    { id: 16, value: "기타", isInterested: false },
  ],
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
