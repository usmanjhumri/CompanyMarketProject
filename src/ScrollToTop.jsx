import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
function ScrollToTop({ children }) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  return children || null;
}

export default ScrollToTop;
