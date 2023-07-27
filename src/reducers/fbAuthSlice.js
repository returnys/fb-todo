// FB state 초기값

import { createSlice } from "@reduxjs/toolkit";

// slice 초기값
const initialState = {
  uid: null, // 개별데이터
  displayName: null, // 개별데이터
  email: null, // 개별데이터
  isAuthReady: false,
  errMessage: "",
};

const fbAuthSlice = createSlice({
  name: "fbAuthSlice",
  initialState,
  // 액션 크리에이터 생성 함수 모음
  // 상태를 즉시 업데이트(동기 코드)
  reducers: {
    loginFB: (state, action) => {
      // state.user = action.payload;
      state.displayName = action.payload.displayName;
      state.uid = action.payload.uid;
      state.email = action.payload.email;
    },
    logoutFB: state => {
      // state.user = null;
      state.displayName = null;
      state.uid = null;
      state.email = null;
    },
    isAuthReadyFB: (state, action) => {
      // state.user = action.payload;
      state.displayName = action.payload?.displayName;
      state.uid = action.payload?.uid;
      state.email = action.payload?.email;
      state.isAuthReady = true;
    },
    updateNameFB: (state, action) => {
      // state.user = action.payload;
      state.displayName = action.payload.displayName;
    },
    updateEmailFB: (state, action) => {
      // state.user = action.payload;
      state.email = action.payload.email;
    },
    deleteUserFB: state => {
      // state.user = null;
      state.displayName = null;
      state.uid = null;
      state.email = null;
    },
    isErrorFB: (state, action) => {
      state.errMessage = action.payload;
    },
  },
});

// store에 포함하기 위한 export
export default fbAuthSlice;
// dispatch 활용
export const {
  loginFB,
  logoutFB,
  isAuthReadyFB,
  updateNameFB,
  updateEmailFB,
  deleteUserFB,
  isErrorFB,
} = fbAuthSlice.actions;
