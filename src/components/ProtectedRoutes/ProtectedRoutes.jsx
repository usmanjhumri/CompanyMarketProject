import { Navigate, Outlet } from "react-router-dom";
import { storageKey } from "../../Const/CONST";

export const ProtectedRoutes = () => {
  const isLoggedIn = localStorage.getItem(storageKey);

  return isLoggedIn ? <Navigate to="/" replace /> : <Outlet />;
};

export const SignUpProtectedRouts = () => {
  const isLoggedIn = localStorage.getItem(storageKey);

  return isLoggedIn ? <Navigate to="/" replace /> : <Outlet />;
};

export const ProtectedRoutesBeforeLoggedIn = () => {
  const isLoggedIn = localStorage.getItem(storageKey);
  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" replace />;
};
