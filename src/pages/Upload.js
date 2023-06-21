import axios from "axios";
import React, { useState } from "react";

// 기본형 이미지 업로드 컴포넌트
const UploadFetch = () => {
  // 임시로 올려진 이미지 파일URL을 출력한다
  const [uploadImg, setUploadImg] = useState(null);

  const handleFileChange = async event => {
    // 파일을 전달할 주소(수정해야함)
    const sendUrl = "/upload";

    // 전송할 키명(수정해야함)
    const sendKey = "profile";

    // 파일은 배열 즉, files로 전달된다.
    // 파일이 한 개인 경우 files[0]에 해당 파일이 담겨있다.
    const file = event.target.files[0];
    // console.log(file);

    // 전송할 데이터 객체 즉, 객체 리터럴을 생성한다.
    // FormData는 html form의 데이터로서, form을 쉽게 전송하도록 도와주는 객체
    // body에 객체를 넣어서 HTTP 전송을 한다.
    const formData = new FormData();

    // FormData 객체에 속성명:값을 추가한다.
    // 이 경우 append(속성명: 값) 메서드를 활용한다.
    formData.append(sendKey, file);
    console.log(formData);

    // 전송을 한다
    try {
      const res = await fetch(sendUrl, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("전송완료:", res);

      // 임시로 올려진 이미지를 미리보기하자.
      // 임시로 URL을 만드는 메서드(필수 메서드 X)
      // 아래 메서드는 blob(Binary Large Object)을 생성한다.
      // blob은 이진수로 데이터를 표현한다.
      setUploadImg(URL.createObjectURL(file));
    } catch (error) {
      console.log("업로드 실패:", error);
    }
  };
  return (
    <>
      <h3>기본형 이미지 업로드</h3>
      <div>
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={handleFileChange}
        />
        {/* 꼭 업로드한 이미지를 확인할 필요는 없다. */}
        {uploadImg && (
          <div>
            {uploadImg}
            <img src={uploadImg} alt="업로드 이미지" />
          </div>
        )}
      </div>
    </>
  );
};

// 미리보기 업로드 컴포넌트
const UploadPreview = () => {
  // 이미지 미리보기 state
  const [uploadImage, setUploadImage] = useState(null);
  // 업로드 하고 나서 컨텐츠에 보여줄 이미지
  const [charImg, setCharImg] = useState(null);

  // 이미지 선택 처리 핸들러
  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      // 1번.
      const reader = new FileReader();
      // 이미지가 임시파일로 웹브라우저에 로드완료되면
      reader.onloadend = () => {
        // state 변경한다.
        console.log(reader.result);
        // 3번.
        setUploadImage(reader.result);
      };
      // 2번. 임시 파일을 읽어들인다.
      reader.readAsDataURL(file);
    }
  };

  // 임시 파일 지우기
  const handleFileRemove = () => {
    setUploadImage(null);
  };

  // 파일 업로드
  const handleFileUpload = async () => {
    // 수정해야할 내용
    const sendUrl = "/upload";
    const sendKey = "profile";

    if (uploadImage) {
      const formData = new FormData();
      formData.append(sendKey, uploadImage);
      try {
        const res = await fetch(sendUrl, {
          method: "POST",
          body: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("전송완료 : ", res);
        // 서버가 정상적으로 업데이트 되고 나서 URL 줄 때
        const serverStatus = res.status.toString();
        console.log(serverStatus.charAt(0));
        if (serverStatus.charAt(0) === "2") {
          setCharImg("서버의 이미지 주소 URL");
        } else {
          // 서버가 이상있어서 데모버전으로 프론트에서 처리
          setCharImg(uploadImage);
        }
      } catch (error) {
        console.log("전송실패 : ", error);
      }
    }
  };

  // 화면에 이미지 미리보기 보여주는 함수
  const renderImagePreview = () => {
    if (uploadImage) {
      return (
        <div>
          {uploadImage}
          <img src={uploadImage} alt="업로드이미지" />
          <button onClick={handleFileRemove}>지우기</button>
          <button onClick={handleFileUpload}>업로드</button>
        </div>
      );
    }
    return null;
  };
  return (
    <>
      <h3>미리보기 업로드</h3>
      <div>
        {/* 이미지 미리보기 출력 */}
        {renderImagePreview()}
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={handleFileChange}
        />
      </div>
      {charImg && (
        <div>
          <h4>사용자 캐릭터 이미지</h4>
          <span
            style={{
              display: "block",
              width: "50px",
              height: "50px",
              overflow: "hidden",
              background: "hotpink",
            }}
          >
            <img
              src={charImg}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </span>
        </div>
      )}
    </>
  );
};

// axios 이미지 업로드 컴포넌트
const UploadAxios = () => {
  // 이미지 미리보기 state
  const [uploadImage, setUploadImage] = useState(null);
  // 업로드 하고 나서 컨텐츠에 보여줄 이미지
  const [charImg, setCharImg] = useState(null);

  // 이미지 선택 처리 핸들러
  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      // 1번.
      const reader = new FileReader();
      // 이미지가 임시파일로 웹브라우저에 로드완료되면
      reader.onloadend = () => {
        // state 변경한다.
        console.log(reader.result);
        // 3번.
        setUploadImage(reader.result);
      };
      // 2번. 임시 파일을 읽어들인다.
      reader.readAsDataURL(file);
    }
  };

  // 임시 파일 지우기
  const handleFileRemove = () => {
    setUploadImage(null);
  };

  // 파일 업로드
  const handleFileUpload = async () => {
    // 수정해야할 내용
    const sendUrl = "/upload";
    const sendKey = "profile";

    if (uploadImage) {
      const formData = new FormData();
      formData.append(sendKey, uploadImage);
      try {
        const res = await axios.post(sendUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("전송완료 : ", res);
        // 서버가 정상적으로 업데이트 되고 나서 URL 줄 때
        const serverStatus = res.status.toString();
        console.log(serverStatus.charAt(0));
        if (serverStatus.charAt(0) === "2") {
          setCharImg("서버의 이미지 주소 URL");
        } else {
          // 서버가 이상있어서 데모버전으로 프론트에서 처리
          setCharImg(uploadImage);
        }
      } catch (error) {
        console.log("전송실패 : ", error);
        // 서버가 이상있어서 데모버전으로 프론트에서 처리
        setCharImg(uploadImage);
      }
    }
  };

  // 화면에 이미지 미리보기 보여주는 함수
  const renderImagePreview = () => {
    if (uploadImage) {
      return (
        <div>
          {uploadImage}
          <img src={uploadImage} alt="업로드이미지" />
          <button onClick={handleFileRemove}>지우기</button>
          <button onClick={handleFileUpload}>업로드</button>
        </div>
      );
    }
    return null;
  };
  return (
    <>
      <h3>axios 이미지 업로드</h3>
      <div>
        {/* 이미지 미리보기 출력 */}
        {renderImagePreview()}
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={handleFileChange}
        />
      </div>
      {charImg && (
        <div>
          <h4>사용자 캐릭터 이미지</h4>
          <span
            style={{
              display: "block",
              width: "50px",
              height: "50px",
              overflow: "hidden",
              background: "hotpink",
            }}
          >
            <img
              src={charImg}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </span>
        </div>
      )}
    </>
  );
};

// json 데이터 & 이미지 업로드
const UploadJson = () => {
  return (
    <>
      <h3>JSON & 이미지 업로드</h3>
    </>
  );
};

// 다중 이미지 업로드
const UploadMulti = () => {
  return (
    <>
      <h3>다중 이미지 업로드</h3>
    </>
  );
};

const Upload = () => {
  return (
    <div className="p-6 mt-5 shadow rounded bg-white">
      <h2>이미지 업로드</h2>
      <UploadFetch />
      <UploadPreview />
      <UploadAxios />
      <UploadJson />
      <UploadMulti />
    </div>
  );
};

export default Upload;
