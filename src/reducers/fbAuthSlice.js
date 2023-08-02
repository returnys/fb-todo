// FB state 초기값

import { createSlice } from "@reduxjs/toolkit";
import { asyncLoginFetch, asyncLogoutFetch } from "./actions";

// slice 초기값
const initialState = {
  uid: null,
  displayName: null,
  email: null,
  isAuthReady: false,
  errMessage: "",
  isLoading: false, // 비동기 처리
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
  // 비동기 업데이트 체크(미들웨어) 코드
  // axios 또는 fetch를 이용합니다.
  // 비동기 액션(thunk 리듀서)에 따른 액션처리
  // pending(호출중)/fulfield(결과리턴)/rejected(호출실패)
  extraReducers: builder => {
    builder.addCase(asyncLoginFetch.pending, (state, action) => {
      console.log("로그인 연결중...");
      state.isLoading = true;
    });
    builder.addCase(asyncLoginFetch.fulfilled, (state, action) => {
      console.log("결과를 돌려받음");
      state.displayName = action.payload.displayName
        ? action.payload.displayName
        : null;
      state.uid = action.payload.uid ? action.payload.uid : null;
      state.email = action.payload.email ? action.payload.email : null;
      state.errMessage = action.payload.errMessage
        ? action.payload.errMessage
        : "";
      state.isLoading = false;
    });
    builder.addCase(asyncLoginFetch.rejected, (state, action) => {
      console.log("네트워크 에러");
      state.isLoading = false;
      state.errMessage = "네트워크 연결 오류입니다.";
    });
    // logout 케이스
    builder.addCase(asyncLogoutFetch.fulfilled, (state, action) => {
      console.log("로그아웃 완료");
      state.displayName = action.payload.displayName;
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.errMessage = action.payload.errMessage;
    });
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

// 비동기 액션크리에이터(dispatch로 호출) thunk 전용
// export { asyncLoginFetch };
