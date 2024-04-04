import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const PrivateRoute = ({ type }) => {
  const { user } = useAuth();
    console.log(user)
  return user && user?.role?.name === type ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;