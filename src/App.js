import { useState } from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";

function App() {
  // dummy data
  const dummy = [
    { id: 1, title: "할 일 1", completed: true },
    { id: 2, title: "할 일 2", completed: false },
    { id: 3, title: "할 일 3", completed: true },
    { id: 4, title: "할 일 4", completed: true },
  ];
  // dummy data state 변수
  const [todoData, setTodoData] = useState(dummy);

  return (
    <>
      <div className="container">
        <div className="todo-block">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>
          {/* 할 일 목록 */}
          <List todoData={todoData} setTodoData={setTodoData} />
          {/* 할 일 추가 */}
          <Form todoData={todoData} setTodoData={setTodoData} />
        </div>
      </div>
    </>
  );
}

export default App;
