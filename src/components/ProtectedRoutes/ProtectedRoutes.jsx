import { Navigate, Outlet } from "react-router-dom";
import { storageKey } from "../../Redux/api/api";

export const ProtectedRoutes = () => {
  const isLoggedIn = localStorage.getItem(storageKey);

  return isLoggedIn ? <Navigate to="/" replace /> : <Outlet />;
};

export const SignUpProtectedRouts = () => {
  const isLoggedIn = localStorage.getItem(storageKey);

  return isLoggedIn ? <Navigate to="/" replace /> : <Outlet />;
};
