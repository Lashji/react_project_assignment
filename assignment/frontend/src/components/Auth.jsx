/** @format */

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

const Auth = ({ authRoles }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  console.log("auth params id", id);

  const auth = useSelector((state) => {
    console.log("auth: ", state.auth);
    return state.auth;
  });

  if (!authRoles.includes(auth.role) && auth.role === "guest")
    navigate("/login");
  else if (!authRoles.includes(auth.role)) navigate("/");
  return (
    <div data-testid="auth-success-component">
      <Outlet />
    </div>
  );
};

export default Auth;
