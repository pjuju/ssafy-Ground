const SET_USER_ID = "find/SET_USER_ID";
const SET_USER_EMAIL = "find/SET_USER_EMAIL";
const SET_ID_FLAG = "find/SET_ID_FLAG";
const SET_PW_FLAG = "find/SET_PW_FLAG";

export const setUserId = (userId) => ({ type : SET_USER_ID, userId});
export const setUserEmail = (userEmail) => ({ type : SET_USER_EMAIL, userEmail});
export const setIdFlag = (idFlag) => ({ type : SET_ID_FLAG, idFlag});
export const setPwFlag = (pwFlag) => ({ type : SET_PW_FLAG, pwFlag});

const initialState = {
  userId: "",
  userEmail: "",
  idFlag: 0,
  pwFlag: 0,
};

export default function find(state=initialState, action){
  switch(action.type){
    case SET_USER_ID:
      return {
        ...state,
        userId: action.userId,
      };
    
    case SET_USER_EMAIL:
      return {
        ...state,
        userEmail: action.userEmail,
      };
    case SET_ID_FLAG:
      return {
        ...state,
        idFlag: action.idFlag,
      };

    case SET_PW_FLAG:
      return {
        ...state,
        pwFlag: action.pwFlag,
      };
    
    default:
      return state;
  }
}