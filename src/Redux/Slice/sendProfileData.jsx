/* eslint-disable no-unused-vars */
import { createAction, createSlice } from "@reduxjs/toolkit";
import { sendProfileData } from "../api/api";
export const profileSuccessData = createAction(
  "sendProfileDataReducer/profileData"
);

let initialState = {
  isLoading: false,
  isError: false,
  success: false,
  Message: "",
  profileData: [],
  description: null,
  imgPath: "",
  logoImageType: "",
};

const sendProfileDatas = createSlice({
  name: "sendProfileData",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(sendProfileData.pending, (state, action) => {
        state.isLoading = true;
        state.Message = "";
        state.isError = false;
      })
      .addCase(sendProfileData.fulfilled, (state, action) => {
        // console.log(action.payload, "sendProfileData");
        state.isLoading = false;
        state.isError = false;
        state.success = true;
        state.Message = action.payload.message;
        state.imgPath = action.payload;
      })
      .addCase(sendProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.success = false;
        state.Message = action.payload.message;
        // state.logoImageType = action.payload.message;
      })
      .addCase(profileSuccessData, (state) => {
        state.success = false;
        state.isError = false;
        state.Message = "";
      });
  },
});

export default sendProfileDatas.reducer;
