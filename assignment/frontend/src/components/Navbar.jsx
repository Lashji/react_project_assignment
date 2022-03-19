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
  let role = useSelector((state) => state.auth.role);
  if (!role) role = "guest";
  const [links, setLinks] = useState(AllLinks[role]);

  useEffect(() => {
    setLinks(AllLinks[role]);
  }, [role]);

  const dispatch = useDispatch();

  let linksElements;

  if (AllLinks[role]) {
    linksElements = links.map((i) => {
      return (
        <Link
          key={`${i}-link`}
          to={`${i.toLowerCase()}`}
          data-testid={`${i.toLowerCase()}-link`}
        >
          {i.toLowerCase()}
        </Link>
      );
    });
  }

  let logoutLink = <></>;

  if (role !== "guest") {
    logoutLink = (
      <Link
        to={"/"}
        onClick={(e) => dispatch(logOut())}
        key={"logout-link"}
        data-testid="logout-link"
      >
        logout
      </Link>
    );
  }

  return (
    <div data-testid="navbar-component">
      <Link to="/" key={"home-link"} data-testid="home-link">
        home
      </Link>
      <Link to="products" key={"products-link"} data-testid="products-link">
        products
      </Link>
      {linksElements}
      {logoutLink}
    </div>
  );
};

export default Navbar;
