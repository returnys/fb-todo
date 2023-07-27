import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useFirebase";

const Header = () => {
  // AuthContext 로그아웃 실행으로 상태 변경
  const { displayName, email, uid } = useSelector(state => state.fbAuth);
  const { logout } = useLogout();
  // fb 로그아웃
  const handleLogout = () => {
    logout();
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
              to={uid ? "/todo" : "/login"}
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
          {uid ? (
            <div className="text-white">
              <span className="px-2">{displayName}</span>
              <span>{email}</span>
              <span className="px-2">{uid}</span>
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
