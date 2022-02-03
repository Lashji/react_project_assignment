/** @format COMPONENTS */

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPlayer } from "../redux/actionCreators/playersActions";

export const AddPlayer = () => {
  const [name, setName] = useState("");
  const [active, setActive] = useState(false);

  const dispatch = useDispatch();
  const handlePlayerSubmit = (e) => {
    e.preventDefault();

    dispatch(addPlayer({ name, active }));
  };

  return (
    <form onSubmit={(e) => handlePlayerSubmit(e)}>
      <h2>Add player</h2>
      <label htmlFor="name">Player name</label>
      <input
        required
        name="name"
        id="name"
        placeholder="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="active">is active</label>
      <input
        type="checkbox"
        id="active"
        name="active"
        checked={active}
        onChange={(e) => setActive(e.target.checked)}
      />
      <button type="submit">Add</button>
    </form>
  );
};
