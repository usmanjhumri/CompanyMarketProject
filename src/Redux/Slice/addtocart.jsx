import { createSlice, createAction } from "@reduxjs/toolkit";
import { addToCart as addToCartApi } from "../api/api";
export const resetSuccessCart = createAction("addToCart/resetSuccessCart");
const addToCart = createSlice({
  name: "addToCart",
  initialState: {
    isLoading: false,
    isError: false,
    errorMessage: "",
    success: "",
  },
  extraReducers: (builder) => {
    builder.addCase(addToCartApi.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addToCartApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      state.success = action.payload.status;
    });
    builder.addCase(addToCartApi.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.error.message;
      state.success = "";
    });
    builder.addCase(resetSuccessCart, (state) => {
      state.success = "";
    });
  },
});
export default addToCart.reducer;
