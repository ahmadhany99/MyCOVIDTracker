import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const AdminPrivateRoute = ({ redirectPath = "/", children }) => {
  const user = Cookies.get("email");
  const usertype = Cookies.get("Usertype");
  if (!user && usertype != 2) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default AdminPrivateRoute;
