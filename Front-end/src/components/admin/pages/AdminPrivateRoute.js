import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const outside = (c) => {
  if (c === undefined) {
    return false;
  } else {
    return true;
  }
};

const AdminPrivateRoute = ({ redirectPath = "/", children }) => {
  const user = Cookies.get("email");
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default AdminPrivateRoute;
