import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = "https://marketplace.jdfunnel.com/api/";

export const fetchHomeData = createAsyncThunk("fetchHomeData", async () => {
  const res = await axios.get(`${apiUrl}homepage`);
  return res.data;
});

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async (index) => {
    const res = await axios.get(`${apiUrl}all-products/fetch?page=${index}`);
    return res.data;
  }
);
