import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./Slice/home";
import allproductsReducer from "./Slice/allproducts";
export const store = configureStore({
  reducer: {
    home: homeReducer,
    allProducts: allproductsReducer,
  },
});
