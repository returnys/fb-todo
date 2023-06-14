import { useState } from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";

function App() {
  console.log("App 렌더링");
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
    <div className="flex items-center justify-center w-screen h-screen bg-blue-300">
      <div className="w-4/5 p-6 bg-white rounded-[8px] shadow">
        <div>
          <div className="flex justify-between mb-3">
            <h1 className="text-center w-3/4 text-2xl font-bold text-cyan-500">
              Firebase Todo-List
            </h1>
          </div>
          {/* 할 일 목록 */}
          <List todoData={todoData} setTodoData={setTodoData} />
          {/* 할 일 추가 */}
          <Form todoData={todoData} setTodoData={setTodoData} />
        </div>
      </div>
    </div>
  );
}

export default App;
