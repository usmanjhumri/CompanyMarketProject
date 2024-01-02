import { createSlice } from "@reduxjs/toolkit";
import { checkOutCart } from "../api/api";

const userCheckout = createSlice({
  name: "userCheckout",
  initialState: {
    userCheckout: [],
    loading: false,
    error: null,
    success: false,
    pubKeb: "",
    gateWay: {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(checkOutCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkOutCart.fulfilled, (state, action) => {
        console.log("API Response:", action);
        state.loading = false;
        state.checkOut = action.payload?.user;
        state.pubKeb = action?.payload?.data?.publishable_keys?.stripe;
        if (action?.payload?.data?.gateway_currency)
          state.gateWay = action?.payload?.data?.gateway_currency[0];
        else return;
      })
      .addCase(checkOutCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userCheckout.reducer;
