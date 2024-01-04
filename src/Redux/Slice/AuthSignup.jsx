import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signUp } from "../api/api";

const userDetails = createSlice({
  name: "createUser",
  initialState: {
    user: [],
    loading: false,
    orderNumber: null,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        console.log("API Response:", action.payload);

        state.loading = false;
        state.user = action.payload?.user;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userDetails.reducer;
