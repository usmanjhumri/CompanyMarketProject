/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Pagenotfound from "./components/PageNotFound";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData, getCart, getProfileData } from "./Redux/api/api";
import { SkeletonTheme } from "react-loading-skeleton";
import OnlinePayment from "./components/Onlinepaymentstripe";
import Signup from "./components/Signup";
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
import ChangePassword from "./components/ChangePassword";
import AboutUs from "./components/Aboutus";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import BillDetail from "./components/Bill/BillDetail";
import {
  ProtectedRoutes,
  ProtectedRoutesBeforeLoggedIn,
  SignUpProtectedRouts,
} from "./components/ProtectedRoutes/ProtectedRoutes";
import ProfileSetting from "./components/ProfileSettings";
import Dashboard from "./components/Dashboard/Dashboard";
import PurchaseHistory from "./components/PurchaseHistory/PurchaseHistory";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsCondtions from "./components/Terms&Condtions";
import TopToScroll from "./ScrollToTop";
import { order_number } from "./Const/CONST";
import { createTheme } from "@mui/material";
function App() {
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState("");
  const dispatch = useDispatch();
  const error500 = useSelector((state) => state?.home?.isError);
  const errorMsg = useSelector((state) => state?.home?.errorMessage);
  const isLoading = useSelector((state) => state?.home?.isLoading);

  React.useEffect(() => {
    setOrderNumber(window.localStorage.getItem(order_number));

    if (orderNumber) {
      dispatch(getCart(orderNumber));
    }
  }, [orderNumber]);

  React.useEffect(() => {
    const getHomeData = () => {
      dispatch(fetchHomeData());
      dispatch(getProfileData());
    };
    return () => getHomeData();
  }, []);

  React.useEffect(() => {
    const handleBeforeUnload = (event) => {
      navigate("/");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigate]);

  React.useEffect(() => {
    if (error500) {
      if (errorMsg?.includes("500")) {
        navigate("/500");
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
            <TopToScroll>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories/:name/:id" element={<Categoires />} />
                <Route path="/products" element={<Products />} />
                <Route
                  path=":category_id/sub-categories/:name/:id"
                  element={<Subcategory />}
                />
                <Route
                  path="/product/:category_id/:name/:id/:order_number?"
                  element={<ProductDetail />}
                />
                <Route path="*" element={<Pagenotfound />} />

                <Route element={<ProtectedRoutes />}>
                  <Route path="/signin" element={<Signin />} />
                </Route>
                <Route path="/forget" element={<ForgotPassword />} />

                <Route element={<SignUpProtectedRouts />}>
                  <Route path="/signup" element={<Signup />} />
                </Route>
                <Route path="/product/search" element={<SearchProduct />} />
                <Route path="/cart" element={<Shopping />} />
                <Route element={<ProtectedRoutesBeforeLoggedIn />}>
                  <Route path="/forget" element={<ForgotPassword />} />
                </Route>
                <Route element={<SignUpProtectedRouts />}>
                  <Route path="/reset-password" element={<ResetPassword />} />
                </Route>
                <Route path="/changepassword" element={<ChangePassword />} />

                <Route element={<ProtectedRoutesBeforeLoggedIn />}>
                  <Route path="/profile-setting" element={<ProfileSetting />} />
                </Route>

                <Route element={<ProtectedRoutesBeforeLoggedIn />}>
                  <Route
                    exact
                    path="/billing-detail/:trx/:publishable_key"
                    element={<BillDetail />}
                  />
                </Route>
                <Route element={<ProtectedRoutesBeforeLoggedIn />}>
                  <Route
                    path="/online-checkout/:trx/:publishable_key"
                    element={<OnlinePayment />}
                  />
                </Route>
                <Route element={<ProtectedRoutesBeforeLoggedIn />}>
                  <Route exact path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route
                  exact
                  path="/purchase-history"
                  element={<PurchaseHistory />}
                />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsCondtions />} />
              </Routes>
            </TopToScroll>
          </SkeletonTheme>
          <Footer />
          <ToastContainer />
        </>
      )}
    </div>
  );
}

export default App;
