// store.ts
import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./reducers/userSlice";
import storeItemReducer from "./reducers/storeItemSlice";

// Redux Store 생성
const store = configureStore({
  reducer: {
    user: UserSlice,
    storeItems: storeItemReducer,
    // theme: themeReducer,
  },
});

// RootState 및 AppDispatch 타입 내보내기 (타입스크립트 환경)
export type RootState = ReturnType<typeof store.getState>; // initalstate
export type AppDispatch = typeof store.dispatch; //

export default store;
