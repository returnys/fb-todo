import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appAuth } from "../firebase/config";

// 로그인, 로그아웃, 회원가입 처리 상태를 위한 Custom Hook
export const useSignup = () => {
  // 사용자 상태에 따라 웹브라우저 라우터 이동
  const navigate = useNavigate();

  // 서버의 에러 상태를 보관
  const [error, setError] = useState(null);

  // 서버의 연결 시도 및 연결, 연결 후 상태를 보관
  const [ispending, setIspending] = useState(false);

  // 실제 연결을 실행할 함수
  // signup(이메일, 비밀번호, 닉네임)
  const signup = (email, password, displayName) => {
    // 실행 시 초기에 에러는 없다.
    setError(null);
    // 통신을 연결한다.
    setIspending(true);
    // 사용자 등록 시작
    createUserWithEmailAndPassword(appAuth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // 만약 user 값이 없을 때
        if (!user) {
          // 에러 객체를 출력한다.
          console.log("회원가입에 실패하였습니다.");
          return;
        }
        // 성공시에는 사용자 닉네임을 설정한다.
        updateProfile(appAuth.currentUser, {
          displayName: displayName,
          // photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
          .then(() => {
            // 프로필 업데이트 성공
            setError(null)
            // 연결 후 작업 완료
            setIspending(false);
            // 회원가입 성공으로 login 라우터로 이동
            navigate("/login");
          })
          .catch(err => {
            // 프로필 업데이트 실패
            console.log(err);
            setError(error)
          });
      })
      .catch(err => {
        // 회원 가입 실패 에러
        setError(err.message);
      });
  };

  // 현재 error, ispending, signup 을 리턴한다.
  return { error, ispending, signup };
};
