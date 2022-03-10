/** @format */

import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/actionCreators/authActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      logIn({
        email,
        password,
      })
    );
  };

  return (
    <div data-testid="login-component">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} data-testid="login-form">
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          data-testid="email-input"
          type={"email"}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          name="password"
          data-testid="password-input"
          type={"password"}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" data-testid="login-button">
          LogIn
        </button>
      </form>
    </div>
  );
};

export default Login;
