/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useNavigate,
  useParams,
  useOutletContext,
} from "react-router-dom";
import { removeUser } from "../redux/actionCreators/usersActions";

const User = ({ providedUser }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let user = useOutletContext();
  const { userId } = params;

  console.log("UserId", userId, providedUser);

  const auth = useSelector((state) => {
    return state.auth;
  });

  const stateUser = useSelector((state) => {
    if (!userId) return;

    return state.users.find((i) => i.id === userId);
  });

  if (!user && !providedUser) {
    if (stateUser) user = stateUser;
  }

  let inspectLinkComponent = <></>;

  if (userId) {
    console.log("Outlet ", user, providedUser);
    providedUser = user;
  } else {
    inspectLinkComponent = (
      <Link to={`./${providedUser.id}`} data-testid="inspect-link">
        Inspect
      </Link>
    );
  }

  const modifyUrl = userId ? `modify` : `${providedUser.id}/modify`;

  const optionalButtons = () => {
    if (auth.id !== providedUser.id) {
      return (
        <div>
          <button
            data-testid={`modify-button-${providedUser.id}`}
            onClick={(e) => navigate(modifyUrl)}
          >
            Modify
          </button>
          <button
            data-testid={`delete-button-${providedUser.id}`}
            onClick={(e) => dispatch(removeUser(providedUser.id))}
          >
            Delete
          </button>
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div data-testid="user-component">
      <h2 data-testid="name-heading">{providedUser.name}</h2>
      {inspectLinkComponent}
      <h3 data-testid="email-element">Email: {providedUser.email}</h3>
      <h3 data-testid="role-element">Role: {providedUser.role}</h3>
      {optionalButtons()}
    </div>
  );
};

export default User;
