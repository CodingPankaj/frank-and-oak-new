import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { MainContext } from "../context/MainContext";

export const ProtectedRoute = ({ children }) => {
  const { isLoggedin } = useContext(MainContext);

  return isLoggedin ? <Outlet /> : <Navigate to="/login" />;
};
