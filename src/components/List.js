import React from "react";
import ListItem from "./ListItem";

const List = ({ todoData, setTodoData }) => {
  console.log("List 렌더링");
  return (
    <div>
      {/* 할 일 목록 */}
      {todoData.map(item => {
        return (
          <ListItem
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

export default React.memo(List);
