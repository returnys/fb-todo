import { useEffect, useState } from "react";
import React from "react";
import List from "../components/List";
import Form from "../components/Form";

const Todo = () => {
  // local data state 변수
  const initTodoData = localStorage.getItem("fbTodoData")
    ? JSON.parse(localStorage.getItem("fbTodoData"))
    : [];
  const [todoData, setTodoData] = useState(initTodoData);
  const handleRemoveClick = () => {
    setTodoData([]);
    // localStorage 초기화
    localStorage.setItem("fbTodoData", JSON.stringify([]));
  };

  useEffect(()=>{
    // axios get 호출로 fbtodolist 자료받기
  }, [])

  return (
    <div className="flex items-start justify-center mt-5 w-full">
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
        <List todoData={todoData} setTodoData={setTodoData} />
        {/* 할 일 추가 */}
        <Form todoData={todoData} setTodoData={setTodoData} />
      </div>
    </div>
  );
};

export default Todo;