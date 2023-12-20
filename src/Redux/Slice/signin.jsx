/* eslint-disable no-unused-vars */
import { createSlice, createAction } from "@reduxjs/toolkit";
import { signIn } from "../api/api";
export const resetSuccessSignin = createAction("signInReducer/resetLogin");
let initialState = {
  username: null,
  isLoading: false,
  isError: false,
  isLogedIn: false,
  success: false,
};

const signInSlice = createSlice({
  name: "signInReducer",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        console.log(action.payload);
        let { email, username, token } = action.payload;

        // if (!(email && username && token)) throw new Error();
        // console.log(action.payload, "after condition");

        state.isLoading = false;
        state.isError = false;
        state.username = username;
        state.token = token;
        state.isLogedIn = true;
        state.success = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      });
    builder.addCase(resetSuccessSignin, (state) => {
      state.isLogedIn = "";
      state.success = false;
    });
  },
});

export default signInSlice.reducer;
