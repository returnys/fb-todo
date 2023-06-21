import React from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase from "../firebase";
const Header = ({
  userName,
  userEmail,
  userUid,
  setUserName,
  setUserEmail,
  setUserUid,
}) => {
  const navigate = useNavigate();
  // fb 로그아웃
  const handleLogout = () => {
    firebase.auth().signOut();
    console.log("로그아웃");
    setUserName("");
    setUserEmail("");
    setUserUid("");
    navigate("");
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
              to={userUid ? "/todo" : "/login"}
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
        </ul>
        <div className="flex justify-center gap-5">
          {userUid ? (
            <div className="text-white">
              <span className="px-2">{userName}</span>
              <span>{userEmail}</span>
              <span className="px-2">{userUid}</span>
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
