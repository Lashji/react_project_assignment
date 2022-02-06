/** @format COMPONENTS */

import { useState } from "react";
import { useDispatch } from "react-redux";
import { postPlayer } from "../redux/actionCreators/thunks/AddPlayer";

export const AddPlayer = () => {
  const [username, setUsername] = useState("");
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e, newPlayer) => {
    e.preventDefault();
    dispatch(postPlayer(newPlayer));
  };

  return (
    <form
      action=""
      onSubmit={(e) => handleSubmit(e, { name: username, isActive: active })}
    >
      <input
        id="name"
        required
        type="text"
        name="name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        id="active"
        type="checkbox"
        name="active"
        defaultChecked={active}
        onChange={(e) => setActive(e.target.checked)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
