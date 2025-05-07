import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";

// storeItems를 서버에서 가져오기
export const fetchStoreItems = createAsyncThunk<
  any,
  string | undefined,
  {
    rejectValue: string;
  }
>("storeItems/fetchStoreItems", async (category, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/storeitems`,
      {
        params: category ? { category } : {},
      }
    );
    return response.data;
  } catch (err: any) {
    console.error("storeItems fetch error:", err);
    return rejectWithValue(err.response?.data || "Unknown error");
  }
});

// Slice
const storeItemsSlice = createSlice({
  name: "storeItems",
  initialState: {
    items: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoreItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStoreItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchStoreItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default storeItemsSlice.reducer;
