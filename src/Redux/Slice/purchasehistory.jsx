import { createSlice } from "@reduxjs/toolkit";
import { purchaseHistory } from "../api/api";
const purchaseHistorySlice = createSlice({
  name: "userpurchasehistory",
  initialState: {
    isLoading: false,
    isError: false,
    data: [],
    errorMessage: "",
  },
  extraReducers: (builder) => {
    builder.addCase(purchaseHistory.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(purchaseHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(purchaseHistory.rejected, (state, action) => {
      state.isError = true;
    });
  },
});
export default purchaseHistorySlice.reducer;
