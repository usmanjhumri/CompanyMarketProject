/* eslint-disable no-unused-vars */
import { createSlice, createAction } from "@reduxjs/toolkit";
import { signInNew } from "../api/api";
export const resetSuccessSignin = createAction("signInReducer/resetLogin");
let initialState = {
  username: null,
  isLoading: false,
  isError: false,
  isLogedIn: false,
  success: false,
  errorMessage: "",
};
const signInSlice = createSlice({
  name: "signInReducer",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signInNew.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(signInNew.fulfilled, (state, action) => {
        let { email, username, token } = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.username = username;
        state.token = token;
        state.isLogedIn = true;
        state.success = true;
      })
      .addCase(signInNew.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.errorMessage = action.payload.message || "something went wrong";
      })
      .addCase(resetSuccessSignin, (state) => {
        state.isLogedIn = "";
        state.success = false;
        state.isError = false;
        state.errorMessage = "";
      });
  },
});
export default signInSlice.reducer;
