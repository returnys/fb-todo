import React, { useState } from "react";

const Form = ({ todoData, setTodoData }) => {
  // 새로운 할 일 state 변수
  const [value, setValue] = useState("");

  // input type="text"의 값 갱신해서 화면 리렌더링
  const handleChange = e => {
    setValue(e.target.value);
  };

  // form submit 실행 시 체크
  const handleSubmit = e => {
    // 웹 브라우저 url 주소표시창으로 데이터 전송을 막아야함.
    // 마치 a 태그의 href를 막아주듯이.
    e.preventDefault();
    // 새로운 todo 객체를 만들어준다.
    // 기존의 데이터 형식을 지켜야한다.(프로퍼티명 동일하게)
    const newTodo = { id: Date.now(), title: value, completed: false };
    // state 저장 후 화면 리렌더링된다.
    // 기존 todoData에 newTodo를 추가
    setTodoData([...todoData, newTodo]);
    // 입력창 초기화
    setValue("");
  };

  return (
    <div>
      <div>
        <form action="" style={{ display: "flex" }} onSubmit={handleSubmit}>
          <input
            type="text"
            name="value"
            style={{ flex: "10", padding: "5px" }}
            placeholder="할 일을 입력해주세요."
            value={value}
            onChange={handleChange}
          />
          <input type="submit" value="입력" style={{ flex: "1" }} />
        </form>
      </div>
    </div>
  );
};

export default Form;
