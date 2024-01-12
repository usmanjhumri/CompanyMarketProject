/* eslint-disable no-unused-vars */
import { createAction, createSlice } from "@reduxjs/toolkit";
import { changePassword } from "../api/api";
export const changePasswordSuccess = createAction(
  "changePasswordReducer/changePassword"
);

let initialState = {
  isLoading: false,
  isError: false,
  success: false,
  Message: "",
  password: [],
  userPasswordUpdated: null,
};

const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.Message = "";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        let userPasswordChanged = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.userPasswordUpdated = userPasswordChanged;
        state.Message = action.payload.message;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.Message = action.payload || "An error occurred";
        state.success = false;
      })
      .addCase(changePasswordSuccess, (state) => {
        state.isLoading = false;
        state.Message = "";
        state.success = false;
        state.isError = false;
      });
  },
});
export default changePasswordSlice.reducer;
