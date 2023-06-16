import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import Todo from "./pages/Todo";

function App() {
  // console.log("App 렌더링");

  // 추후에 Redux/Recoil state로 관리 필요
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userUid, setUserUid] = useState("");

  return (
    <>
      <div className="w-screen h-screen bg-blue-300 overflow-x-hidden">
        <Header
          userName={userName}
          userEmail={userEmail}
          userUid={userUid}
          setUserName={setUserName}
          setUserEmail={setUserEmail}
          setUserUid={setUserUid}
        />
        <div className="container h-full mx-auto">
          <Routes>
            {/* Navigate를 이용한 강제 이동 */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/login"
              element={
                <Login
                  setUserName={setUserName}
                  setUserEmail={setUserEmail}
                  setUserUid={setUserUid}
                />
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/todo"
              element={
                <Todo
                  userName={userName}
                  userEmail={userEmail}
                  userUid={userUid}
                />
              }
            />
            <Route
              path="/mypage"
              element={
                <MyPage
                  userName={userName}
                  userEmail={userEmail}
                  userUid={userUid}
                  setUserName={setUserName}
                  setUserEmail={setUserEmail}
                  setUserUid={setUserUid}
                />
              }
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
