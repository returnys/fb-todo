import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import { appAuth } from "../firebase/config";

// FB인증 Context를 생성
const AuthContext = createContext();

// context 관리 reducer함수
const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      // state를 갱신한다.
      return { ...state, user: action.payload };
    case "logout":
      return { ...state, user: null };
    case "isAuthReady":
      return { ...state, user: action.payload, isAuthReady: true };
    case "updateName":
      return { ...state, user: action.payload };
    case "updateEmail":
      return { ...state, user: action.payload };
    case "deleteUser":
      return { ...state, user: null };
    case "isError":
      return { ...state, errMessage: action.payload };
    default:
      return state;
  }
};
// Context를 구독(Subscribe)하도록 Provider를 생성
const AuthContextProvider = ({ children }) => {
  // Context에 담겨진 전역 상태 관리를 위한 Hook
  // const [전역상태, 전역상태관리함수]=useReducer(함수, 초기값);
  const [state, dispatch] = useReducer(authReducer, {
    user: null, // 사용자 정보
    isAuthReady: false, // 로그인 상태 체크
    errMessage: "", // 에러 메시지
  });
  // FB 인증 웹브라우저 새로고침 처리
  useEffect(() => {
    // 로그인을 했는지 아닌지를 파악한다.
    onAuthStateChanged(appAuth, user => {
      // AuthContext에 user 정보를 입력한다.
      // console.log("onAuthStateChanged : ", user);
      dispatch({ type: "isAuthReady", payload: user });
    });
  }, []);
  return (
    // Context 내부의 컴포넌트들에게 상태정보를 공급한다.
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
