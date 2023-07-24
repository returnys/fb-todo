import { Modal } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import NotFound from "./pages/NotFound";
import Schedule from "./pages/Schedule";
import SignUp from "./pages/SignUp";
import Todo from "./pages/Todo";
import TodoChart from "./pages/TodoChart";
import Upload from "./pages/Upload";
import { onAuthStateChanged } from "firebase/auth";
import { appAuth } from "./firebase/config";

function App() {
  // const { isAuthReady, user, errMessage, dispatch } = useAuthContext();
  // store에 저장된 state를 읽어온다.
  // const isAuthReady = useSelector(state => state.isAuthReady);
  // const user = useSelector(state => state.user);
  // const errMessage = useSelector(state => state.errMessage);
  const { isAuthReady, user, errMessage } = useSelector(state => state);
  // 2. store에 저장된 state를 갱신(액션 만들어서 전달)
  const dispatch = useDispatch();

  // FB 인증 웹브라우저 새로고침 처리
  useEffect(() => {
    // 로그인을 했는지 아닌지를 파악한다.
    onAuthStateChanged(appAuth, user => {
      // AuthContext에 user 정보를 입력한다.
      // console.log("onAuthStateChanged : ", user);
      dispatch({ type: "isAuthReady", payload: user });
    });
  }, []);

  // 에러메시지 모달 관련
  const error = () => {
    Modal.error({
      title: "Firebase Warning Message!",
      content: errMessage,
      onOk: dispatch({ type: "isError", payload: "" }),
      okButtonProps: { style: { background: "red" } },
    });
  };

  useEffect(() => {
    if (errMessage !== "") {
      error(errMessage);
    }
  }, [errMessage]);

  return (
    <>
      {isAuthReady ? (
        <div className="w-screen h-screen bg-blue-300 overflow-x-hidden">
          <Header />
          <div className="container h-full mx-auto">
            <Routes>
              {/* Navigate를 이용한 강제 이동 */}
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/login"
                element={user ? <Navigate to="/home" /> : <Login />}
              />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/todo"
                element={user ? <Todo /> : <Navigate to="/login" />}
              />
              <Route
                path="/mypage"
                element={user ? <MyPage /> : <Navigate to="/login" />}
              />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/chart" element={<TodoChart />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
}

export default App;
