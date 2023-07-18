import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Header = () => {
  // AuthContext 로그아웃 실행으로 상태 변경
  const { user } = useAuthContext();
  const { logout } = useLogout();
  // const navigate = useNavigate();
  console.log(user);
  // fb 로그아웃
  const handleLogout = () => {
    logout();
    // dispatch({ type: "logout"});
    // firebase.auth().signOut();
    // console.log("로그아웃");
    // setUserName("");
    // setUserEmail("");
    // setUserUid("");
    // navigate("/");
  };

  return (
    <header className="p-7 bg-black">
      <div className="flex flex-wrap items-center justify-between">
        <Link to="/" className="text-white hover:text-orange-600">
          logo
        </Link>
        <ul className="flex items-center justify-center gap-4">
          <li>
            <Link to="/home" className="text-white hover:text-orange-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-orange-600">
              About
            </Link>
          </li>
          <li>
            <Link
              to={user ? "/todo" : "/login"}
              className="text-white hover:text-orange-600"
            >
              Todo
            </Link>
          </li>
          <li>
            <Link to="/schedule" className="text-white hover:text-orange-600">
              Schedule
            </Link>
          </li>
          <li>
            <Link to="/upload" className="text-white hover:text-orange-600">
              Upload
            </Link>
          </li>
          <li>
            <Link to="/chart" className="text-white hover:text-orange-600">
              Chart
            </Link>
          </li>
        </ul>
        <div className="flex justify-center gap-5">
          {user ? (
            <div className="text-white">
              <span className="px-2">{user.displayName}</span>
              <span>{user.email}</span>
              <span className="px-2">{user.uid}</span>
              <button onClick={handleLogout}>Logout</button>
              <Link to="/mypage" className="text-white px-2">
                마이페이지
              </Link>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-orange-600">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:text-orange-600">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
