import { useState } from "react";

export const AddPlayer = ({ handleSubmit }) => {
  const [username, setUsername] = useState("");
  const [active, setActive] = useState(false);

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
