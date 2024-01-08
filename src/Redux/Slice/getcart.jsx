/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { getCart } from "../api/api";
const getCartItem = createSlice({
  name: "getCart",
  initialState: {
    isLoading: false,
    isError: false,
    errorMessage: "",
    success: "",
    data: [],
    userBalance: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      state.success = action.payload.status;
      state.data = action.payload.data;

      state.userBalance = action.payload.user_balance;

      // state.zeroPages = action.payload.data[0].bumpresponses[0].pages;
      // state.zeroPagesName = action.payload.data[0].bumpresponses[0].bump.name;
      // state.zeroPagesPrice = action.payload.data[0].bumpresponses[0].price;
      // state.sixPages = action.payload.data[0].bumpresponses[1].pages;
      // state.sixPagesName = action.payload.data[0].bumpresponses[1].bump.name;
      // state.sixPagesPrice = action.payload.data[0].bumpresponses[1].price;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
      state.success = "";
      state.data = [];
    });
  },
});
export default getCartItem.reducer;
