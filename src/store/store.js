import { configureStore } from "@reduxjs/toolkit";
import fbAuthSlice from "../reducers/fbAuthSlice";

// reducer들을 모아줌.
const store = configureStore({
  reducer: {
    fbAuth: fbAuthSlice.reducer,
  },
});

export default store;