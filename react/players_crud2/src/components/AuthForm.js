import { useState } from "react";

const MODES = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
};

export const AuthForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState(MODES.LOGIN);

  const modeText = mode === MODES.LOGIN ? "Login" : "Register";
  const linkText = mode === MODES.LOGIN ? "Register" : "Login";
  const changeMode = () => {
    const newMode = mode === MODES.LOGIN ? MODES.REGISTER : MODES.LOGIN;
    setMode(newMode);
  };

  return (
    <div>
      <a href="#" onClick={(e) => changeMode()}>
        Go to {linkText}
      </a>
      <form
        id="auth-form"
        action=""
        onSubmit={(e) => handleSubmit(e, { username, password, mode })}
      >
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="name"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        />
        <button>{modeText}</button>
      </form>
    </div>
  );
};
