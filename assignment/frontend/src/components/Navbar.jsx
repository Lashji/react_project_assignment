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
  const role = useSelector((state) => state.auth.role);

  const links = AllLinks[role].map((i) => {
    return (
      <Link key={`link-${i}`} to={`/${i}`}>
        {i}
      </Link>
    );
  });

  if (role !== "guest") {
    links.push(<Link to="/logout">Logout</Link>);
  }

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="Products">Products</Link>
      {links}
    </div>
  );
};

export default Navbar;
