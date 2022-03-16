/** @format */

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/actionCreators/usersActions";
import { useNavigate, useParams } from "react-router-dom";

const UserModifier = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userId } = useParams();

  const user = useSelector((state) => state.users.find((i) => i.id === userId));

  const [role, setRole] = useState(user.role);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUser({ ...user, role }));

    navigate("/users");
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      data-testid="user-modifier-component"
    >
      <h1 data-testid="name-heading">{user.name}</h1>
      <select
        data-testid="role-select"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="customer">customer</option>
        <option value="admin">admin</option>
      </select>
      <button
        disabled={role == user.role}
        data-testid="update-button"
        type="submit"
      >
        Update
      </button>
    </form>
  );
};

export default UserModifier;
