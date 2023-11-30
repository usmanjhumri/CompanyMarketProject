import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts } from "../api/api";

const allProductSlice = createSlice({
  name: "allproducts",
  initialState: {
    isLoading: false,
    getProducts: [],
    isError: false,
  },
  extraReducers: (builder) => {
    // eslint-disable-next-line no-unused-vars
    builder.addCase(fetchAllProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.getProducts = action?.payload?.allProducts?.data;
    });
    // eslint-disable-next-line no-unused-vars
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.getProducts = [];
      state.isLoading = false;
    });
  },
});
export default allProductSlice.reducer;
