import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  vendorDetails: {},
  isLoading: false,
  error: null,
};

export const fetchContent = createAsyncThunk(
  "content/fetchContent",
  async () => {
    const res = await axios("https://jsonplaceholder.typicode.com/photos");
    const data = await res.data;
    return data;
  }
);

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.tasks.push({ id: Date.now(), text: action.payload });
    },
    deleteTodo: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contents = action.payload;
    });
    builder.addCase(fetchContent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { addTodo, deleteTodo } = commonSlice.actions;

export default commonSlice.reducer;
