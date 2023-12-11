import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = "https://marketplace.jdfunnel.com/api/";

export const fetchHomeData = createAsyncThunk("fetchHomeData", async () => {
  const res = await axios.get(`${apiUrl}homepage`);
  return res.data;
});

// export const fetchAllProducts = createAsyncThunk(
//   "fetchAllProducts",
//   async (index) => {
//     const res = await axios.get(`${apiUrl}all-products/fetch?page=${index}`);
//     return res.data;
//   }
// );

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async function ({ minPrice, maxPrice, checkCatName }) {
    const res = await axios.get(`${apiUrl}product/filtered/data`, {
      params: {
        min: minPrice,
        max: maxPrice,
        categories: checkCatName,
      },
    });
    return res.data;
  }
);

export const productDetail = createAsyncThunk(
  "productDetail",
  async (params) => {
    const res = await axios.get(
      `${apiUrl}product-details/${params.name}/${params.id}/fetch`
    );
    return res.data;
  }
);
