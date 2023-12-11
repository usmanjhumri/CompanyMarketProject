import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts } from "../api/api";

const allProductSlice = createSlice({
  name: "allproducts",
  initialState: {
    isLoading: false,
    getProducts: [],
    paginationData: {
      currentIndex: 0,
      endIndex: 0,
      perPageProduct: 0,
      totalProduct: 0,
    },
    isError: false,
  },
  extraReducers: (builder) => {
    // eslint-disable-next-line no-unused-vars
    builder.addCase(fetchAllProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      console.log(action.payload.allProducts);
      state.isLoading = false;
      state.getProducts = action?.payload?.allProducts;
      state.paginationData.currentIndex =
        action?.payload?.allProducts?.current_page;
      state.paginationData.endIndex = action?.payload?.allProducts?.last_page;
      state.paginationData.perPageProduct =
        action?.payload?.allProducts?.per_page;

      state.paginationData.totalProduct = action?.payload?.allProducts?.total;
    });
    // eslint-disable-next-line no-unused-vars
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.getProducts = [];
      state.paginationData = {};
      state.isLoading = false;
    });
  },
});

export default allProductSlice.reducer;
