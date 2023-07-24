import React from "react";
import { useNavigate } from "react-router";

const About = () => {
  const navigate = useNavigate();
  // const { dispatch, kakaoProfile } = useAuthContext();

  // useEffect(() => {
  //   console.log("kakao 사용자 정보", kakaoProfile);
  //   if (!kakaoProfile) {
  //     kakaoLogOut();
  //   }
  // }, [kakaoProfile]);

  // 로그아웃
  // const kakaoLogOut = () => {
  //   if (!window.Kakao.Auth.getAccessToken()) {
  //     console.log("Not logged in.");
  //     return;
  //   }
  //   window.Kakao.Auth.logout(function (response) {
  //     dispatch({ type: "kakaoLogout" });
  //     // alert(response + " logout");
  //     // window.location.href='/'
  //     navigate("/");
  //   });
  // };
  // 회원탈퇴
  // const memberOut = () => {
  //   window.Kakao.API.request({
  //     url: "/v1/user/unlink",
  //     success: function (response) {
  //       console.log(response);
  //       //callback(); //연결끊기(탈퇴)성공시 서버에서 처리할 함수
  //       // window.location.href='/'
  //       dispatch({ type: "kakaoOut" });
  //       navigate("/");
  //     },
  //     fail: function (error) {
  //       console.log("탈퇴 미완료");
  //       console.log(error);
  //     },
  //   });
  // };
  return (
    <div className="p-6 mt-5 shadow rounded bg-white">
      About
      {/* {kakaoProfile ? (
        <div>
          <button onClick={kakaoLogOut}>카카오 로그아웃/</button>
          <button onClick={memberOut}>카카오 회원탈퇴/</button>
          <div>
            <p>{kakaoProfile.nickname}</p>
            <img className="w-20 h-20" src={kakaoProfile.profile_image_url} />
          </div>
        </div>
      ) : (
        <KakaoLogin />
      )} */}
      {/* {kakaoProfile && (
        <div>
          <button onClick={kakaoLogOut}>카카오 로그아웃/</button>
          <button onClick={memberOut}>카카오 회원탈퇴/</button>
          <div>
            <p>{kakaoProfile.nickname}</p>
            <img className="w-20 h-20" src={kakaoProfile.profile_image_url} />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default About;
