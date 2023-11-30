import { createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = "https://marketplace.jdfunnel.com/api/";

export const fetchHomeData = createAsyncThunk("fetchHomeData", async () => {
  const res = await fetch(`${apiUrl}homepage`);
  const check = res.json();
  return check;
});

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async () => {
    const res = await fetch(`${apiUrl}all-products/fetch`);
    return res.json();
  }
);
