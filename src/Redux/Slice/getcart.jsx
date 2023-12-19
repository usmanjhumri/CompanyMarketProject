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
