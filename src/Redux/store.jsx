import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./Slice/home";
export const store = configureStore({
  reducer: {
    home: homeReducer,
  },
});
