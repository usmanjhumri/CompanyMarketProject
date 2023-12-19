/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Pagenotfound from "./components/PageNotFound";
import { useDispatch } from "react-redux";
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
import "react-phone-number-input/style.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchHomeData());
    setOrderNumber(window.localStorage.getItem("order_Number"));

    dispatch(signIn(storageKey));

    if (orderNumber) {
      dispatch(getCart(orderNumber));
    }
  }, [dispatch, orderNumber]);

  return (
    <div>
      {/* <Signin /> */}
      <Header />
      {/* <Shopping /> */}
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
          <Route
            path="/signin"
            element={<Signin setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/signup"
            element={<Signup setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/product/search" element={<SearchProduct />} />
          <Route path="/cart" element={<Shopping />} />
          <Route path="/forget" element={<Signin />} />
        </Routes>
      </SkeletonTheme>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
