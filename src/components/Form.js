import React, { useState } from "react";
import { useFireStore } from "../hooks/useFireStore";

const Form = ({ todoData, setTodoData, userName, userEmail, uid }) => {
  // FB Store의 Collection 참조를 활용
  const { addDocument, response } = useFireStore("todo");

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
    // 정규표현식 처리 예정
    // if (value === "") {
    //   alert("내용을 입력하세요");
    // }
    // 새로운 todo 객체를 만들어준다.
    // 기존의 데이터 형식을 지켜야한다.(프로퍼티명 동일하게)
    // const newTodo = {
    //   id: Date.now(),
    //   title: value,
    //   completed: false,
    //   author: userName,
    //   email: userEmail,
    // };
    // state 저장 후 화면 리렌더링된다.
    // 기존 todoData에 newTodo를 추가한 새로운 배열 저장
    // set함수 즉, setTodoData에서 갱신된 state를 즉시 가지고 오기 위해서는
    // set함수의 인수로 콜백함수를 전달한다.
    // setTodoData([...todoData, newTodo]);

    // setTodoData(prevState => {
    //   return [...prevState, newTodo];
    // });

    // localStorage 저장
    // localStorage.setItem("fbTodoData", JSON.stringify([...todoData, newTodo]));

    // axios post 호출로 fbtodolist 추가하기
    // postTodo(newTodo);

    // FB의 Collection에 Document를 추가한다.
    // Document 형식은 객체 리터럴이다.
    addDocument({ uid, title: value, completed: false });

    // 입력창 초기화
    setValue("");
  };

  return (
    <div>
      <div>
        <form
          className="flex pt-2"
          style={{ display: "flex" }}
          onSubmit={handleSubmit}
        >
          <input
            className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
            type="text"
            name="value"
            style={{ flex: "10", padding: "5px" }}
            placeholder="할 일을 입력해주세요."
            value={value}
            onChange={handleChange}
          />
          <input
            className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-400"
            type="submit"
            value="입력"
            style={{ flex: "1" }}
          />
        </form>
      </div>
    </div>
  );
};

export default Form;
