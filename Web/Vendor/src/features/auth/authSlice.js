import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { postMethod } from "../../helpers";

const initialState = {
  vendorDetails: {},
  isLoading: false,
  error: null,
};

export const vendorLogin = createAsyncThunk(
  "vendorLogin",
  async () => {
    let url = "users/login";
      let payload = {
        emailOrPhoneNumber: values.email,
        password: values.password,
        userType: "Vendor",
      };
    const response = await postMethod({ url, payload });
    if (response.success) {
        localStorage.setItem("@token", response.data.data);
        history.push("/dashboard");
      } else {
        toast.error(response.message);
      }
    const data = await res.data;
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
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
    builder.addCase(vendorLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(vendorLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vendorDetails = action.payload;
    });
    builder.addCase(vendorLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { addTodo, deleteTodo } = authSlice.actions;

export default authSlice.reducer;
