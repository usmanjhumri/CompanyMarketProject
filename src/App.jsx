import React from "react";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
// import Funnel from "./components/Funnel";
import Home from "./components/Home";
import Pagenotfound from "./components/PageNotFound";
import { useDispatch } from "react-redux";
import { fetchHomeData } from "./Redux/Slice/home";
import { SkeletonTheme } from "react-loading-skeleton";
function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <SkeletonTheme>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:name/:id" element={<Home />} />
          {/* <Route path="/website" element={<Home />} />
          <Route path="/businesscards" element={<Home />} />
          <Route path="/logos" element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/GHL-Add-on's" element={<Home />} />
          <Route path="/marketing" element={<Home />} />
          <Route path="/surveys" element={<Home />} /> */}
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </SkeletonTheme>
      <Footer />
    </div>
  );
}

export default App;
