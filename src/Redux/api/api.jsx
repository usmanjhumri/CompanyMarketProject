import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api_base_URL, storageKey, order_number, id } from "../../Const/CONST";

///Home API Started
export const fetchHomeData = createAsyncThunk("fetchHomeData", async () => {
  try {
    const res = await axios.get(`${api_base_URL}homepage`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
});

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async function ({ minPrice, maxPrice, checkCatName, orderBy, searchValue }) {
    const res = await axios.get(`${api_base_URL}product/filtered/data`, {
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
    const res = await axios.get(`${api_base_URL}product/filtered/data`, {
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

///Home API Ended

//Auth API Started
export const changePassword = createAsyncThunk(
  "changePassword",
  async function (data, { rejectWithValue }) {
    const token = JSON.parse(localStorage.getItem(storageKey)).token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const res = await axios.post(`${api_base_URL}password/change`, data, {
        headers,
      });
      if (res) {
        return res.data;
      } else {
        // console.error("Unexpected response format:", res);
        throw new Error("Unexpected response format");
      }
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async function (data, { rejectWithValue }) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.post(
        `${api_base_URL}auth/password/reset`,
        data,
        headers
      );
      if (res) {
        return res.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const resetPasswordVerify = async (data) => {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const res = await axios.post(
      `${api_base_URL}auth/password/update`,
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
      const res = await axios.post(`${api_base_URL}auth/sign-in`, data);
      if (res) {
        const localStorageData = JSON.stringify({
          email: res?.data?.data?.email,
          username: res?.data?.data?.username,
          token: res?.data?.access_token,
          balance: res?.data?.data?.balance,
        });
        localStorage.setItem(id, res.data.data.id);

        window.localStorage.setItem(storageKey, localStorageData);
        return res.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signUp = createAsyncThunk(
  "createUser",
  async function (data, { rejectWithValue }) {
    try {
      const res = await axios.post(`${api_base_URL}auth/sign-up`, data);
      if (res) {
        localStorage.setItem("id", res.data.data.id);
        return res.data;
      }
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);
/// Auth APi Ended

//// Cart & checkout APi Started
export const deleteCart = createAsyncThunk(
  "deleteItem",
  async (id, { dispatch }) => {
    try {
      const res = await axios.get(`${api_base_URL}product/remove-cart/${id}`);

      return res.data;
    } catch (e) {
      return e.response.status;
    }
  }
);

export const addToCart = createAsyncThunk(
  "addToCart",
  async function (productData, { rejectWithValue }) {
    try {
      const res = await axios.post(
        `${api_base_URL}product/add-to-cart`,
        productData
      );
      if (res) {
        const orderNumber = res.data.order_number;
        const existingOrderNumber = window.localStorage.getItem(order_number);
        if (!existingOrderNumber) {
          window.localStorage.setItem(order_number, orderNumber);
        }

        return res.data;
      }
    } catch (e) {
      throw rejectWithValue(e.response.data);
    }
  }
);
export const getCart = createAsyncThunk(
  "getCart",
  async function (orderNumber) {
    try {
      const res = await axios.get(`${api_base_URL}product/cart/${orderNumber}`);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const productDetail = createAsyncThunk(
  "productDetail",
  async (params) => {
    const res = await axios.get(
      `${api_base_URL}product-details/${params.name}/${params.id}/fetch${
        params.order_number === undefined ? "" : `/${params.order_number}`
      }`
    );
    return res.data;
  }
);

export const checkOutCart = createAsyncThunk(
  "userCheckout",
  async function (data, { dispatch }) {
    const token = JSON.parse(localStorage.getItem(storageKey)).token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.post(`${api_base_URL}checkout`, data, { headers });
    if (res.data.success) {
      return res.data;
    }

    // if (data.wallet_type === "own") {
    //   const res = await axios.post(`${api_base_URL}checkout`, data, { headers });
    //   if (res.data.success) {
    //     const newBalance = res.data.data.balance;
    //     const fetchOldBalance = JSON.parse(localStorage.getItem(storageKey));
    //     if (fetchOldBalance) {
    //       fetchOldBalance.balance = newBalance;
    //     }
    //     localStorage.setItem(storageKey, JSON.stringify(fetchOldBalance));
    //     const orderNumber = res.data.order_number;
    //     const existingOrderNumber = window.localStorage.getItem(order_number);
    //     if (!existingOrderNumber) {
    //       window.localStorage.setItem(order_number, orderNumber);
    //     }
    //     if (res.data.success) {
    //       dispatch(getCart(existingOrderNumber || orderNumber));
    //     }
    //     return res.data;
    //   }
    // } else {
    //   const res = await axios.post(`${api_base_URL}checkout`, data, { headers });
    //   if (res.data.success) {
    //     return res.data;
    //   }
    // }
  }
);

export const paymentProcess = async (data) => {
  try {
    const token = JSON.parse(localStorage.getItem(storageKey)).token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.post(`${api_base_URL}checkout/process`, data, {
      headers,
    });
    return res.data.data;
  } catch (e) {
    return e;
  }
};

export const paymentStripe = async (data) => {
  try {
    const token = JSON.parse(localStorage.getItem(storageKey)).token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.post(`${api_base_URL}payment/process`, data, {
      headers,
    });
    return res.data;
  } catch (e) {
    return e;
  }
};

export const emptyCart = async (productID) => {
  try {
    const res = await axios.get(
      `${api_base_URL}product/empty-cart/${productID}`
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
///// Cart API Ended

// ProfileSetting API started
export const getProfileData = createAsyncThunk(
  "getProfileData",
  async function () {
    const token = JSON.parse(localStorage.getItem(storageKey)).token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.get(`${api_base_URL}profile/setting`, { headers });
    return res.data;
  }
);

export const sendProfileData = createAsyncThunk(
  "sendProfileData",
  async function (data, { rejectWithValue }) {
    try {
      const token = JSON.parse(localStorage.getItem(storageKey)).token;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.post(`${api_base_URL}profile-setting`, data, {
        headers,
      });
      return res.data;
    } catch (error) {
      throw rejectWithValue(error.data);
    }
  }
);

// ProfileSetting API  ended

export const purchaseHistory = createAsyncThunk(
  "userpurchasehistory",
  async function () {
    try {
      const token = JSON.parse(localStorage.getItem(storageKey)).token;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.get(`${api_base_URL}user/puchased-list`, {
        headers,
      });
      return res.data.data;
    } catch (error) {}
  }
);
