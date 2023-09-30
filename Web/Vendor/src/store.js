import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./features/common/commonSlice";

const store = configureStore({
  reducer: {
    todo: commonSlice,
  },
});

export default store;