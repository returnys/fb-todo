import { createContext, useReducer } from "react";

// FB인증 Context를 생성
// Context 생성 목적은 전역 상태정보를 활용
// 컴포넌트에 props를 전달하지 않고 상태정보 출력 및 수정하기 위해
const AuthContext = createContext();

// context 관리 reducer함수
const authReducer = (state, action) => {
  console.log("리듀서 함수 : ", action);
  switch (action.type) {
    case "login":
      // state를 갱신한다.
      return { ...state, user: action.payload };
    case "logout":
      return { ...state, user: null };
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
    user: null, // fb 로그인 정보 {email:"",uid:"",nickName:""}
  });

  return (
    // Context 내부의 컴포넌트들에게 상태정보를 공급한다.
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
