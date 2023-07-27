import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import { AuthContextProvider } from "./context/AuthContext";
// Provider는 store의 state에 접근 가능한 영역을 지정
import { Provider } from "react-redux";
import "./index.css";
import store from "./store/store";

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
