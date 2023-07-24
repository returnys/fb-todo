import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { delelteAllTodo } from "../axios/axios";
import Form from "../components/Form";
import List from "../components/List";
import { useCollection } from "../hooks/useCollection";

const Todo = () => {
  // 사용자별 등록을 위해 user를 참조
  const { user } = useSelector(state => state);
  // 컬렉션 데이터 출력
  const { documents, error } = useCollection("todo", ["uid", "==", user.uid]);
  // 백엔드반 DB 테이블 구성에 활용한다. (테이블식)
  // FB, MongoDB에서는 Collection 구성에 활용한다. (객체방식)
  // 로딩 처리
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  // jsonServer data state 변수
  const initTodoData = [];
  const [todoData, setTodoData] = useState(initTodoData);
  const handleRemoveClick = () => {
    setTodoData([]);
    // localStorage 초기화
    // localStorage.setItem("fbTodoData", JSON.stringify([]));
    delelteAllTodo();
  };

  return (
    <div className="flex items-start justify-center mt-5 w-full">
      {/* {isLoading && <Loading />} */}
      <div className="w-4/5 p-6 bg-white rounded-[8px] shadow">
        <div className="flex justify-between mb-3">
          <h1 className="text-center w-3/4 text-2xl font-bold text-cyan-500">
            Firebase Todo-List
          </h1>
          <button
            className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-400 text-[12px]"
            onClick={handleRemoveClick}
          >
            Delete All
          </button>
        </div>
        {/* 할 일 목록 */}
        {error && <strong>{error}</strong>}
        {documents && <List todoData={documents} />}
        {/* <List todoData={todoData} setTodoData={setTodoData} /> */}
        {/* 할 일 추가 */}
        <Form todoData={todoData} setTodoData={setTodoData} uid={user.uid} />
      </div>
    </div>
  );
};

export default Todo;
