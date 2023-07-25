import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import { AuthContextProvider } from "./context/AuthContext";
// Provider는 store의 state에 접근 가능한 영역을 지정
import { Provider } from "react-redux";
import { createStore } from "redux";
import "./index.css";
// Redux DevTools 설치
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer, { initialState } from "./modules/fbreducer";


// 3. store 생성
// 저장소 = createStore(reducer함수, state초기값, 개발도구);
const store = createStore(authReducer, initialState, composeWithDevTools());

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
