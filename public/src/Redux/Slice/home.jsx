import { createSlice } from "@reduxjs/toolkit";
import { fetchHomeData } from "../api/api";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    isLoading: false,
    catergories: [],
    authorProduct: [],
    mostSellProduct: [],
    mostSellCat: [],
    featureProducts: [],
    isError: false,
    errorMessage: "",
    imgPath: "",
  },
  extraReducers: (builder) => {
    // eslint-disable-next-line no-unused-vars
    builder.addCase(fetchHomeData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchHomeData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authorProduct = action.payload?.bestAuthorProducts;
      state.catergories = action.payload?.browsecategories;
      state.featureProducts = action.payload?.featuredProducts;
      state.mostSellProduct = action.payload?.mostsoldproducts?.flatMap(
        (item) => item
      );
      state.mostSellCat = action.payload?.catwithmostsold;
      state.imgPath = action.payload?.imgpath;
    });
    // eslint-disable-next-line no-unused-vars
    builder.addCase(fetchHomeData.rejected, (state, action) => {
      state.authorProduct = [];
      state.catergories = [];
      state.featureProducts = [];
      state.isLoading = false;
      state.errorMessage = action.error.message;
      console.log(action.error.message, "action to de");
    });
  },
});

export default homeSlice.reducer;
