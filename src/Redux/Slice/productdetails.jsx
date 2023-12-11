import { createSlice } from "@reduxjs/toolkit";
import { productDetail } from "../api/api";

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: {
    isLoading: false,
    isError: false,
    errorMsg: "",
    data: {},
  },
  extraReducers: (builder) => {
    // eslint-disable-next-line no-unused-vars
    builder.addCase(productDetail.pending, (state, action) => {
      state.isLoading = true;
      state.data = {};
    });
    builder.addCase(productDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    });
    // eslint-disable-next-line no-unused-vars
    builder.addCase(productDetail.rejected, (state, action) => {
      state.isLoading = false;
      state.data = {};
      state.errorMsg = action.payload;
      state.isError = true;
    });
  },
});
export default productDetailSlice.reducer;
