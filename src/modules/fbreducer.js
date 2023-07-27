// FB 액션타입 정의
export const FB_LOGIN = "fb/login";
export const FB_LOGOUT = "fb/logout";
export const FB_IS_AUTHREADY = "fb/isAuthReady";
export const FB_UPDATE_NAME = "fb/updateName";
export const FB_UPDATE_EMAIL = "fb/updateEmail";
export const FB_DELETE_USER = "fb/deleteUser";
export const FB_IS_ERROR = "fb/isError";

// FB 리듀서 정의
// 2. Reducer 함수 작성
// dispatch에 의해 전달된 액션을 이용하여 state를 갱신
const authReducer = (state, action) => {
  switch (action.type) {
    case FB_LOGIN:
      // state를 갱신한다.
      return { ...state, user: action.payload };
    case FB_LOGOUT:
      return { ...state, user: null };
    case FB_IS_AUTHREADY:
      return { ...state, user: action.payload, isAuthReady: true };
    case FB_UPDATE_NAME:
      return { ...state, user: action.payload };
    case FB_UPDATE_EMAIL:
      return { ...state, user: action.payload };
    case FB_DELETE_USER:
      return { ...state, user: null };
    case FB_IS_ERROR:
      return { ...state, errMessage: action.payload };
    default:
      return state;
  }
};
export default authReducer;
