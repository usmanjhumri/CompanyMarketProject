/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

import { getProfileData } from "../api/api";

let initialState = {
  isLoading: false,
  isError: false,
  success: false,
  errorMessage: "",
  profileData: [],
  description: null,
  imagePath: "",
  coverImage: "",
  logoImage: "",
  firstName: "",
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
        // console.log(action.payload, " getProfileData");
        state.isLoading = false;
        state.isError = false;
        state.success = true;
        state.profileData = [action.payload.data];
        state.description = action.payload.data.description;
        state.imagePath = action.payload.data.base_url;
        state.coverImage = action.payload.data.cover_image;
        state.logoImage = action.payload.data.image;
        state.firstName = action.payload.data.firstname;
        // console.log(state.firstName, "firsname of user");
      })
      .addCase(getProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.success = false;
        state.profileData = null;
        state.errorMessage = action.payload;
      });
  },
});

export default getProfilesDatas.reducer;
