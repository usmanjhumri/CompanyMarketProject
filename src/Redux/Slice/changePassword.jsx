import { createAction, createSlice } from "@reduxjs/toolkit";
import { changePassword } from "../api/api";
export const changePasswordSuccess = createAction("signInReducer/resetLogin");

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
        state.errorMessage = "";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        console.log(action, " change password action");
        const userPasswordChanged = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.userPasswordUpdated = userPasswordChanged;
        state.Message = action.payload.data.message;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message || "An error occurred";
        state.success = false;
      });
  },
});
export default changePasswordSlice.reducer;
