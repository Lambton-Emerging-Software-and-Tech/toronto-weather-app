import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {

  let isAuthenticated = true;
//   if(localStorage.getItem("token")){
//     isAuthenticated = true
//   }
//   console.log("this", isAuthenticated);
// const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute;
