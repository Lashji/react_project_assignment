/** @format */

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Outlet, useParams, Navigate } from "react-router-dom";
import {} from "react-router-dom";

const Auth = ({ authRoles }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const auth = useSelector((state) => {
    return state.auth;
  });

  if (!authRoles.includes("guest") && auth.role === "guest")
    return <Navigate to="/login" />;
  else if (
    (!authRoles.includes("admin") && auth.role === "admin") ||
    (!authRoles.includes("customer") && auth.role === "customer")
  )
    return <Navigate to="/" />;
  else if (!auth.role) return <></>;
  return (
    <div data-testid="auth-success-component">
      <Outlet />
    </div>
  );
};

export default Auth;
