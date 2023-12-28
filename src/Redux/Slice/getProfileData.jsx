/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

import { getProfileData } from "../api/api";

let initialState = {
  isLoading: false,
  isError: false,
  success: false,
  errorMessage: "",
  profileData: [],
};

const getProfilesDatas = createSlice({
  name: "getProfileData",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getProfileData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProfileData.fulfilled, (state, action) => {
        console.log(action.payload, " getProfileData");
        state.isLoading = false;
        state.isError = false;
        state.errorMessage = "";
      });
  },
});

export default getProfilesDatas.reducer;
