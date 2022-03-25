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

const PrivateRoute = ({
    redirectPath = '/',
    children,
  }) => {
    const user = Cookies.get("username");
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children;
  };

export default PrivateRoute;
