import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import { AuthContextProvider } from "./context/AuthContext";
// Provider는 store의 state에 접근 가능한 영역을 지정
import { Provider } from "react-redux";
import { createStore } from "redux";
import "./index.css";

// 1. Redux Store에서 관리할 초기 객체
const initialState = {
  user: null, // 사용자 정보
  isAuthReady: false, // 로그인 상태 체크
  errMessage: "", // 에러 메시지
};
// 2. Reducer 함수 작성
// dispatch에 의해 전달된 액션을 이용하여 state를 갱신
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
// 3. store 생성
// 저장소 = createStore(reducer함수, state초기값);
const store = createStore(authReducer, initialState);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <AuthContextProvider>
  // store의 state를 사용할 범위 지정
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  // </AuthContextProvider>,
);
