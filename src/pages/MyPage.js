import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../firebase";
import { MyPageDiv } from "../style/UserCSS";

const MyPage = ({
  userName,
  userEmail,
  userUid,
  setUserName,
  setUserEmail,
  setUserUid,
}) => {
  const navigate = useNavigate();
  const [nickName, setNickName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConFirm] = useState("");

  useEffect(() => {
    // if (!userUid) {
    //   navigate("/");
    // }
  }, []);
  // FB의 사용자정보 객체
  const user = firebase.auth().currentUser;
  const handlerNickName = async e => {
    e.preventDefault();
    try {
      await user.updateProfile({
        displayName: nickName,
      });
      setUserName(nickName);
      setNickName(nickName);
      alert("이름 정보를 변경하였습니다.");
    } catch (error) {
      console.log(error.code);
    }
  };
  const handlerEmail = async e => {
    e.preventDefault();
    try {
      await user.updateEmail(email);
      setUserEmail(email);
      setEmail(email);
      alert("이메일 정보를 변경하였습니다.");
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        alert("The email address is already in use");
      } else if (error.code == "auth/invalid-email") {
        alert("The email address is not valid.");
      } else {
        alert("이메일을 확인해 주세요.");
      }
    }
  };
  const handlerPassword = async e => {
    e.preventDefault();
    try {
      await user.updatePassword(pw);
      alert("비밀번호 정보를 변경하였습니다.");
    } catch (error) {
      if (error.code === "auth/weak-password") {
        alert("The password is too weak.");
      } else {
        alert("비밀번호 다시 입력해 주세요.");
      }
    }
  };

  //  회원 탈퇴
  const handlerDelete = async e => {
    e.preventDefault();
    try {
      await user.delete();
      alert("서비스 탈퇴하였습니다.");
      setUserName("");
      setUserEmail("");
      setUserUid("");
      navigate("/");
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <div className="p-6 mt-5 shadow rounded-md bg-white">
      <h2>MyPage</h2>
      {/* 1. emotion을 활용하여 tag의 용도를 구분한다.
          2. css도 함께 적용한다.
      */}
      <MyPageDiv>
        <form>
          <div>
            <label htmlFor="">이름</label>
            <input
              type="text"
              required
              value={nickName}
              onChange={e => {
                setNickName(e.target.value);
              }}
              maxLength={10}
              minLength={2}
            />
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={handlerNickName}
            >
              이름 변경
            </button>
          </div>
          <div>
            <label htmlFor="">이메일</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={handlerEmail}
            >
              이메일 변경
            </button>
          </div>
          <div>
            <label htmlFor="">비밀번호</label>
            <input
              type="password"
              required
              value={pw}
              onChange={e => setPw(e.target.value)}
              minLength={8}
              maxLength={16}
            />
            <label htmlFor="">비밀번호 확인</label>
            <input
              type="password"
              required
              value={pwConfirm}
              onChange={e => setPwConFirm(e.target.value)}
              minLength={8}
              maxLength={16}
            />
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={handlerPassword}
            >
              비밀번호 변경
            </button>
          </div>
          <div className="flex justify-center gap-5 w-full">
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={handlerDelete}
            >
              회원탈퇴
            </button>
            <button
              className="border rounded px-3 py-2 shadow"
              onClick={e => {
                e.preventDefault();
                navigate("/");
              }}
            >
              취소
            </button>
          </div>
        </form>
      </MyPageDiv>
    </div>
  );
};

export default MyPage;
