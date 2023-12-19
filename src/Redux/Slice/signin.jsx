/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { signIn } from "../api/api";

let initialState = {
  username: null,
  isLoading: false,
  isError: false,
  isLogedIn: false,
};

const signInSlice = createSlice({
  name: "signInReducer",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state, action) => {
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      })
      .addCase(signIn.fulfilled, (state, action) => {
        let { email, username, token } = action.payload;

        if (!(email && username && token)) throw new Error();

        state.isLoading = false;
        state.isError = false;
        state.username = username;
        state.token = token;
        state.isLogedIn = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});

export default signInSlice.reducer;
