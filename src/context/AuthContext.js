import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import { appAuth } from "../firebase/config";

// FB인증 Context를 생성
// Context 생성 목적은 전역 상태정보를 활용
// 컴포넌트에 props를 전달하지 않고 상태정보 출력 및 수정하기 위해
const AuthContext = createContext();

// context 관리 reducer함수
// action(요청서)을 처리하는 reducer함수
// reducer함수 형태로 action(요청서)를 처리하는 이유는
// 원본(state)를 훼손하지 않고 원하는 데이터 처리 후
// 원본(state)를 변경한다.(불변성 유지)
const authReducer = (state, action) => {
  console.log("리듀서 함수 : ", action);
  // action은 반드시 형태가 {type: "구분자"}여야 한다.
  switch (action.type) {
    case "login":
      // state를 갱신한다.
      return { ...state, user: action.payload };
    case "logout":
      return { ...state, user: null };
    case "isAuthReady":
      return { ...state, user: action.payload, isAuthReady: true };
    default:
      // 기본값 돌려줌
      return state;
  }
};
// Context를 구독(Subscribe)하도록 Provider를 생성
const AuthContextProvider = ({ children }) => {
  // 유저 정보를 관리할 함수(Reducer)를 생성

  // 각각의 컴포넌트 상태 관리를 위한 Hook
  // const [상태, 상태관리수정함수]=useState(초기값);

  // Context에 담겨진 전역 상태 관리를 위한 Hook
  // const [전역상태, 전역상태관리함수]=useReducer(함수, 초기값);
  const [state, dispatch] = useReducer(authReducer, {
    user: null, // 사용자 정보
    isAuthReady: false, // 로그인 상태 체크
  });
  // FB 인증 웹브라우저 새로고침 처리
  useEffect(() => {
    onAuthStateChanged(appAuth, user => {
      // 로그인을 했는지 아닌지를 파악한다.
      // AuthContext에 user 정보를 입력한다.
      console.log("onAuthStateChanged : ", user);
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
