import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { useAuthContext } from "./hooks/useAuthContext";
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

function App() {

  // 추후에 Redux/Recoil state로 관리 필요
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userUid, setUserUid] = useState("");
  const { isAuthReady, user } = useAuthContext();

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
                element={
                  user ? (
                    <Todo
                      userName={userName}
                      userEmail={userEmail}
                      userUid={userUid}
                    />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
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
