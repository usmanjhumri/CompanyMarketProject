/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Pagenotfound from "./components/PageNotFound";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData, getCart, signIn, storageKey } from "./Redux/api/api";
import { SkeletonTheme } from "react-loading-skeleton";
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin";
import Products from "./components/AllProducts";
import Categoires from "./components/Categoires";
import ProductDetail from "./components/ProductDetail";
import Subcategory from "./components/Subcategories";
import Shopping from "./components/ShoppingCart/Shopping";
import SearchProduct from "./components/SearchProduct";
import InteranlError from "./components/InteralServerError";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/VerifyResetPassword";
import PreLoading from "./components/PreLoader";

import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  ProtectedRoutes,
  SignUpProtectedRouts,
} from "./components/ProtectedRoutes/ProtectedRoutes";
import ChangePassword from "./components/ChangePassword/ChangePassword";
function App() {
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState("");
  const dispatch = useDispatch();
  const error500 = useSelector((state) => state?.home?.isError);
  const errorMsg = useSelector((state) => state?.home?.errorMessage);
  const isLoading = useSelector((state) => state?.home?.isLoading);

  React.useEffect(() => {
    dispatch(fetchHomeData());
    setOrderNumber(window.localStorage.getItem("order_Number"));

    if (orderNumber) {
      dispatch(getCart(orderNumber));
    }
  }, [dispatch, orderNumber]);

  React.useEffect(() => {
    const handleBeforeUnload = (event) => {
      window.localStorage.setItem("reloadFlag", "true");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  React.useEffect(() => {
    if (error500) {
      if (errorMsg?.includes("500")) {
        const reloadFlag = window.localStorage.getItem("reloadFlag");
        if (reloadFlag) {
          window.localStorage.removeItem("reloadFlag");
          navigate("/");
        } else {
          navigate("/500");
        }
      }
    }
  }, [errorMsg, error500, navigate]);
  if (error500) {
    return (
      <div>
        <SkeletonTheme>
          <Routes>
            <Route path="/500" element={<InteranlError />} />
          </Routes>
        </SkeletonTheme>
      </div>
    );
  }

  return (
    <div>
      {isLoading ? (
        <PreLoading />
      ) : (
        <>
          {" "}
          <Header />
          <SkeletonTheme>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories/:name/:id" element={<Categoires />} />
              <Route path="/products" element={<Products />} />
              <Route
                path=":category_id/sub-categories/:name/:id"
                element={<Subcategory />}
              />
              <Route
                path="/product/:category_id/:name/:id"
                element={<ProductDetail />}
              />
              <Route path="*" element={<Pagenotfound />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/signin" element={<Signin />} />
              </Route>

              <Route element={<SignUpProtectedRouts />}>
                <Route path="/signup" element={<Signup />} />
              </Route>
              <Route path="/product/search" element={<SearchProduct />} />
              <Route path="/cart" element={<Shopping />} />
              <Route path="/forget" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/changepassword" element={<ChangePassword />} />
              <Route path="/500" element={<InteranlError />} />
            </Routes>
          </SkeletonTheme>
          <Footer />
          <ToastContainer />
        </>
      )}
    </div>
  );
}

export default App;
