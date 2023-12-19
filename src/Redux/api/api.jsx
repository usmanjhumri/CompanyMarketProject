import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = "https://marketplace.jdfunnel.com/api/";
export const authLoginApi = "https://testportal.jdftest.xyz/api/auth/login";
export const storageKey = "user";
export const fetchHomeData = createAsyncThunk("fetchHomeData", async () => {
  const res = await axios.get(`${apiUrl}homepage`);
  return res.data;
});

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async function ({ minPrice, maxPrice, checkCatName, orderBy, searchValue }) {
    const res = await axios.get(`${apiUrl}product/filtered/data`, {
      params: {
        min: minPrice,
        max: maxPrice,
        categories: checkCatName,
        order_by: orderBy,
        search: searchValue,
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

export const fetchSearchProducts = createAsyncThunk(
  "fetchSearchProducts",
  async function ({ minPrice, maxPrice, checkCatName, orderBy }) {
    const res = await axios.get(`${apiUrl}product/filtered/data`, {
      params: {
        min: minPrice,
        max: maxPrice,
        categories: checkCatName,
        order_by: orderBy,
      },
    });

    return res.data;
  }
);

export const getCart = createAsyncThunk(
  "getCart",
  async function (orderNumber) {
    const res = await axios.get(`${apiUrl}product/cart/${orderNumber}`);
    return res.data;
  }
);

export const addToCart = createAsyncThunk(
  "addToCart",
  async function (productData, { dispatch }) {
    const res = await axios.post(`${apiUrl}product/add-to-cart`, productData);
    if (res) {
      const orderNumber = res.data.order_number;
      const existingOrderNumber = window.localStorage.getItem("order_Number");
      if (!existingOrderNumber) {
        window.localStorage.setItem("order_Number", orderNumber);
      }
      dispatch(getCart(existingOrderNumber));

      return res.data;
    }
  }
);

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: "/signup",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const signIn = createAsyncThunk("signInReducer", async function (key) {
  const user = JSON.parse(localStorage.getItem(key) ?? "{}");

  return Object.keys(user).length ? Promise.resolve(user) : Promise.reject();
});

export const { useSignupMutation } = api;
export default api;
