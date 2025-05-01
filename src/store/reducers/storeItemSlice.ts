// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "@/utils/axiosInstance"; // baseURL 등 설정된 axios 인스턴스를 사용하는 게 좋음

// // 비동기 요청
// export const fetchStoreItems = createAsyncThunk(
//   "storeItems/fetchStoreItems",
//   async (category?: string, { rejectWithValue }) => {
//     try {
//       const res = await axios.get("/storeitems", {
//         params: category ? { category } : {},
//       });
//       return res.data;
//     } catch (err: any) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// const storeItemSlice = createSlice({
//   name: "storeItems",
//   initialState: {
//     items: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchStoreItems.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchStoreItems.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchStoreItems.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export default storeItemSlice.reducer;
// ✅ 3. Redux Store에 등록
// ts
// 복사
// 편집
// // src/store/index.ts
// import { configureStore } from "@reduxjs/toolkit";
// import storeItemReducer from "./slices/storeItemSlice";

// export const store = configureStore({
//   reducer: {
//     storeItems: storeItemReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// ✅ 4. Provider로 감싸기 (_app.tsx)
// tsx
// 복사
// 편집
// // pages/_app.tsx
// import { Provider } from "react-redux";
// import { store } from "@/store";

// function MyApp({ Component, pageProps }) {
//   return (
//     <Provider store={store}>
//       <Component {...pageProps} />
//     </Provider>
//   );
// }

// export default MyApp;
