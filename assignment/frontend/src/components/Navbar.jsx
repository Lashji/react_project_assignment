/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../redux/actionCreators/authActions";

const AllLinks = {
  admin: ["Orders", "Users"],
  customer: ["Orders", "Cart"],
  guest: ["Cart", "Login", "Register"],
};
/**
 * @component
 *
 */
const Navbar = () => {
  const role = useSelector((state) => state.auth.user.role);
  console.log("ROLE ", role);

  const dispatch = useDispatch();

  const links = AllLinks[role].map((i) => {
    return (
      <Link key={`link-${i}`} to={`/${i}`}>
        {i}
      </Link>
    );
  });

  if (role !== "guest") {
    links.push(
      <Link to={"/"} onClick={(e) => dispatch(logOut())} key={"link-logout"}>
        Logout
      </Link>
    );
  }

  return (
    <div>
      <Link to="/" key={"link-home"}>
        Home
      </Link>
      <Link to="Products" key={"link-products"}>
        Products
      </Link>
      {links}
    </div>
  );
};

export default Navbar;
