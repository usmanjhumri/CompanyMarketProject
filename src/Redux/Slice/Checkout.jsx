import { createSlice } from "@reduxjs/toolkit";
import { checkOutCart } from "../api/api";

const userCheckout = createSlice({
  name: "userCheckout",
  initialState: {
    userCheckout: [],
    loading: false,
    error: null,
    success: false,
    success: "",
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
      })
      .addCase(checkOutCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userCheckout.reducer;
