import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const apiUrl = "https://marketplace.jdfunnel.com/api/";
export const authLoginApi = "https://marketplace.jdfunnel.com/api/auth/sign-in";
export const storageKey = "user";
///Home API Started
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

export const signIn = createAsyncThunk("signInReducer", async function (key) {
  const user = JSON.parse(localStorage.getItem(key) ?? "{}");

  return Object.keys(user).length ? Promise.resolve(user) : Promise.reject();
});

///Home API Ended

/// Auth APi Started

export const changePassword = createAsyncThunk(
  "changePassword",
  async function (data, { rejectWithValue }) {
    const token = JSON.parse(localStorage.getItem(storageKey)).token;
    // console.log(token, "token user");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const res = await axios.post(`${apiUrl}password/change`, data, {
        headers,
      });
      if (res) {
        // console.log(res.data, " change password");
        return res.data;
      } else {
        // console.error("Unexpected response format:", res);
        throw new Error("Unexpected response format");
      }
    } catch (e) {
      // console.log(e.response.data.message, "hi this is me");
      return rejectWithValue(e.response.data.message);
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async function (data) {
    const headers = {
      "Content-Type": "application/json",
    };
    const res = await axios.post(`${apiUrl}auth/password/reset`, data, headers);
    if (res) {
      return res.data;
    }
  }
);

export const resetPasswordVerify = async (data) => {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const res = await axios.post(
      `${apiUrl}auth/password/update`,
      data,
      headers
    );

    return res.data;
  } catch (e) {
    return e.response.data;
  }
};

export const signInNew = createAsyncThunk(
  "signInReducer",
  async function (data, { rejectWithValue }) {
    try {
      const res = await axios.post(`${apiUrl}auth/sign-in`, data);
      // console.log(res, " ressss");
      if (res) {
        const localStorageData = JSON.stringify({
          email: res?.data?.data?.email,
          username: res?.data?.data?.username,
          token: res?.data?.access_token,
          balance: res?.data?.data?.balance,
        });
        window.localStorage.setItem(storageKey, localStorageData);
        return res.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
/// Auth APi Ended

//// Cart APi Started
export const deleteCart = createAsyncThunk(
  "deleteItem",
  async (id, { dispatch }) => {
    try {
      const res = await axios.get(`${apiUrl}product/remove-cart/${id}`);
      const existingOrderNumber = window.localStorage.getItem("order_Number");

      dispatch(getCart(existingOrderNumber));
      return res.data;
    } catch (e) {
      return e.response.status;
    }
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
      if (res.data) {
        dispatch(getCart(existingOrderNumber || orderNumber));
      }
      return res.data;
    }
  }
);
export const getCart = createAsyncThunk(
  "getCart",
  async function (orderNumber) {
    const res = await axios.get(`${apiUrl}product/cart/${orderNumber}`);
    return res.data;
  }
);
export const getProfileData = createAsyncThunk(
  "getProfileData",
  async function (data) {
    const res = await axios.get(`${apiUrl}profile/setting/${data}`);
    console.log(res, " response");
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

export const checkOutCart = createAsyncThunk(
  "userCheckout",
  async function (data, { dispatch }) {
    const token = JSON.parse(localStorage.getItem(storageKey)).token;
    // console.log(token, "token user");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.post(`${apiUrl}checkout`, data, { headers });
    console.log(res.data, "tag 99");
    if (res.data.success) {
      const newBalance = res.data.data.balance;
      const fetchOldBalance = JSON.parse(localStorage.getItem(storageKey));
      if (fetchOldBalance) {
        fetchOldBalance.balance = newBalance;
      }
      localStorage.setItem(storageKey, JSON.stringify(fetchOldBalance));
      const orderNumber = res.data.order_number;
      const existingOrderNumber = window.localStorage.getItem("order_Number");
      if (!existingOrderNumber) {
        window.localStorage.setItem("order_Number", orderNumber);
      }
      if (res.data.success) {
        dispatch(getCart(existingOrderNumber || orderNumber));
      }
      return res.data;
    }
  }
);
///// Cart API Ended
