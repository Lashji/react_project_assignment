import { useState } from "react";

const MODES = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
};

export const AuthForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState(MODES.LOGIN);

  const modeText = mode === MODES.LOGIN ? "Log In" : "Register";
  const linkText = mode === MODES.LOGIN ? "Register" : "Log In";
  const changeMode = () => {
    const newMode = mode === MODES.LOGIN ? MODES.REGISTER : MODES.LOGIN;
    setMode(newMode);
  };



  return (
    <div>
      <h1>{modeText}</h1>
      <a href="#" onClick={(e) => changeMode()}>
        {linkText}
      </a>
      <form
        id="auth-form"
        action=""
        onSubmit={(e) =>
          handleSubmit(mode === MODES.LOGIN, e, { username, password })
        }
      >
        <input
          required
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
        />
        <input
          required
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
