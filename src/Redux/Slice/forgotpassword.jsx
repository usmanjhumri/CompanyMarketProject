import { createSlice, createAction } from "@reduxjs/toolkit";
import { forgotPassword } from "../api/api";
export const resetForgotState = createAction("forgotPassword/resetLogin");
const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    isLoading: false,
    success: false,
    successMessage: "",
    isError: false,
    errorMessage: "",
    email: "",
  },
  extraReducers: (builder) => {
    builder.addCase(forgotPassword.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.success = false;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.success = action.payload.success;
      state.successMessage = action.payload.message;
      state.email = action.payload.data.email;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.errorMessage = action.payload || action.error.message;
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(resetForgotState, (state) => {
      state.success = false;
      state.isError = false;
      state.successMessage = "";
      state.errorMessage = "";
    });
  },
});
export default forgotPasswordSlice.reducer;
