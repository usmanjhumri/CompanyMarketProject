import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHomeData = createAsyncThunk("fetchHomeData", async () => {
  const res = await fetch("https://marketplace.jdfunnel.com/api/homepage");
  const check = res.json();
  return check;
});

const homeSlice = createSlice({
  name: "home",
  initialState: {
    isLoading: false,
    catergories: [],
    authorProduct: [],
    mostSellProduct:[],
    mostSellCat:[],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHomeData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchHomeData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authorProduct = action.payload?.bestAuthorProducts;
      state.catergories = action.payload?.browsecategories;
      state.mostSellProduct = action.payload?.mostsoldproducts?.flatMap(item=>item)
      state.mostSellCat = action.payload?.catwithmostsold;
    });
    builder.addCase(fetchHomeData.rejected, (state, action) => {
      state.authorProduct = [];
      state.catergories = [];
    });
  },
});

export default homeSlice.reducer;
