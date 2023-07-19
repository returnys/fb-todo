import React from "react";
import ListItem from "./ListItem";

const List = ({ todoData, setTodoData }) => {
  return (
    <div>
      {/* 할 일 목록 */}
      {todoData.map(item => {
        return (
          <ListItem
          /* key는 반복문에서 꼭 있어야하고 unique 해야한다. */
            key={item.id}
            item={item}
            todoData={todoData}
            setTodoData={setTodoData}
          />
        );
      })}
    </div>
  );
};

// 리렌더링 최적화를 위한 코드
export default React.memo(List);
