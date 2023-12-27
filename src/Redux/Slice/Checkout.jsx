import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const checkOut = createAsyncThunk(
  "checkoutUser",
  async (data, { rejectWithValue }) => {
    // console.log(data, "before");
    try {
      const response = await fetch(
        "https://marketplace.jdfunnel.com/api/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Failed to sign up: ${errorResponse.message}`);
      }

      const res = await response.json();
      // console.log("API Response:", res);
      return res;
    } catch (err) {
      // console.log("Error99", err.message);
      return rejectWithValue({ message: err.message });
    }
  }
);

export const userCheckout = createSlice({
  name: "userCheckout",
  initialState: {
    userCheckout: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(userCheckout.pending, (state) => {
        state.loading = true;
      })
      .addCase(userCheckout.fulfilled, (state, action) => {
        // console.log("API Response:", action.payload);
        state.loading = false;
        state.userCheckout = action.payload?.user;
      })
      .addCase(userCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userCheckout.reducer;
