/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actionCreators/usersActions";
import User from "./User";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    if (users.length === 0) dispatch(getUsers());
  });

  console.log("users:", users);

  return (
    <div data-testid="users-component">
      {users.map((i) => {
        return <User providedUser={i} key={`user-${i.id}`} />;
      })}
    </div>
  );
};

export default Users;
