import React, { useState } from "react";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
// import Funnel from "./components/Funnel";
import Home from "./components/Home";
import Pagenotfound from "./components/PageNotFound";
import { useDispatch } from "react-redux";
import { fetchHomeData } from "./Redux/api/api";
import { SkeletonTheme } from "react-loading-skeleton";
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import Products from "./components/AllProducts";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchHomeData());
  }, []);

  return (
    <div>
      {/* <Signin/> */}
      <Header />
      <SkeletonTheme>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:name/:id" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/businesscards" element={<Home />} />
          <Route path="/logos" element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/GHL-Add-on's" element={<Home />} />
          <Route path="/marketing" element={<Home />} />
          <Route path="/surveys" element={<Home />} />
          <Route path="*" element={<Pagenotfound />} />
          <Route
            path="/signin"
            element={<Signin setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/signup"
            element={<Signup setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
      </SkeletonTheme>
      <Footer />
    </div>
  );
}

export default App;
