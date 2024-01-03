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
    // zeroPages: "",
    // zeroPagesPrice: "",
    // zeroPagesName: "",
    // sixPages: "",
    // sixPagesPrice: "",
    // sixPagesName: "",
    bumpResponse: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      console.log(
        action.payload.data[0].bumpresponses[0].price,
        " bumpresponses "
      );
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      state.success = action.payload.status;
      state.data = action.payload.data;
      state.userBalance = action.payload.user_balance;

      state.bumpResponse = action.payload.data[0].bumpresponses.forEach(
        (bumpResponse, index) => {
          const pagesKey = `${bumpResponse.pages}`;
          const nameKey = `${bumpResponse.bump.name}`;
          const priceKey = `${bumpResponse.pages}`;
          console.log(pagesKey, nameKey, priceKey, " pages name and price");

          state[pagesKey] = bumpResponse.pages;
          state[nameKey] = bumpResponse.bump.name;
          state[priceKey] = bumpResponse.price;
          console.log(
            state[pagesKey],
            state[nameKey],
            state[priceKey],
            " usmanaaaa"
          );
        }
      );
      console.log(state.bumpResponse, " usman");

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
