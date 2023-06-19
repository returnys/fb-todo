import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 1000,
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    Accept: "*/*",
  },
});

// Todo Get 기능
const getTodo = async setTodoData => {
  try {
    const res = await axiosInstance.get("/todo");
    const result = res.data;
    // 문자열로 정보가 넘어온 것을 불리언값으로 바꿔주는 작업
    const todoArr = result.map(item => {
      if (item.completed === "true") {
        item.completed = true;
      } else {
        item.completed = false;
      }
      // item.completed = JSON.parse(item.completed);
      // item.id = JSON.parse(item.id);
      return item;
    });
    setTodoData(todoArr);
  } catch (error) {
    console.log(error);
  }
};

// Todo Post 기능
const postTodo = async newTodo => {
  try {
    const res = await axiosInstance.post("/todo", newTodo);
    const result = res.data;
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

// Todo Patch 기능
const patchTitleTodo = async (_id, editTitle) => {
  try {
    const res = await axiosInstance.patch(`/todo/${_id}`, {
      title: editTitle,
      completed: false,
    });
    const result = res.data;
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const completedPatch = async (_id, item) => {
  try {
    const res = await axiosInstance.patch(`/todo/${_id}`, {
      completed: item.completed,
    });
    const result = res.data;
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

// Todo Delete 기능
const deleteTodo = async _id => {
  try {
    const res = await axiosInstance.delete(`/todo/${_id}`);
    const result = res.data;
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

// 전체 목록 지우기
const delelteAllTodo = async () => {
  try {
    const res = await axiosInstance.get("/todo");
    const result = res.data;
    result.forEach(item => {
      deleteTodo(item.id);
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  axiosInstance,
  completedPatch,
  delelteAllTodo,
  deleteTodo,
  getTodo,
  patchTitleTodo,
  postTodo,
};
