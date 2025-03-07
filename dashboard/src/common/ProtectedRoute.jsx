import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { MainContext } from "../context/MainContext";

export const ProtectedRoute = () => {
  const { isLoggedin } = useContext(MainContext);
  const location = useLocation(); // Capture current location

  return isLoggedin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
