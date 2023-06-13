import { useState } from "react";
import "./App.css";

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
  // 새로운 할 일 state 변수
  const [value, setValue] = useState("");
  const btnStyle = {
    color: "#fff",
    float: "right",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
  };
  const getStyle = _completed => {
    return {
      padding: "10px",
      borderBottom: "1px dotted #ccc",
      textDecoration: _completed ? "line-through" : "none",
    };
  };
  // 이벤트 핸들러
  const handleClick = _id => {
    // 전달된 id를 검색해서 목록에서 제거
    // 1. 전달된 id로 해당하는 목록 찾아서 제외
    // 2. 새로운 목록으로 갱신해서 화면 리렌더링
    // 3. 배열의 고차함수 중 filter를 사용
    const newTodoData = todoData.filter(item => item.id !== _id);
    setTodoData(newTodoData);
  };

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
  const handleCompleteChange = _id => {
    // 중요한 것은 id에 해당하는 것만 수정하면 되는게 아니다.
    // state는 항상 새롭게 만든 내용 즉, 배열로 업데이트 해야 한다.
    // 새로운 배열을 만들어서 set 해야한다.
    let newTodoData = todoData.map(item => {
      if (item.id === _id) {
        item.completed = !item.completed;
      }
      return item;
    });
    setTodoData(newTodoData);
  };
  return (
    <>
      <div className="container">
        <div className="todo-block">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>
          {/* 할 일 목록 */}
          {todoData.map(item => {
            // key는 반복문에서 꼭 있어야하고 unique 해야한다.
            return (
              <div style={getStyle(item.completed)} key={item.id}>
                {/* defaultChecked : 체크박스에 기본체크 상태 설정 */}
                <input
                  type="checkbox"
                  defaultChecked={item.completed}
                  onChange={() => handleCompleteChange(item.id)}
                />
                {item.title}
                <button style={btnStyle} onClick={() => handleClick(item.id)}>
                  X
                </button>
              </div>
            );
          })}
          {/* 할 일 추가 */}
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
      </div>
    </>
  );
}

export default App;
