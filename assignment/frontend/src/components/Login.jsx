/** @format */

import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/actionCreators/authActions";

const Login = () => {
  return (
    <div data-testid="login-component">
      <h1>Login</h1>
      <form>
        <label for="email">Email:</label>
        <input name="email" data-testid="email-input" type={"email"} required />
        <br />
        <label for="pw">Password:</label>
        <input
          name="pw"
          data-testid="password-input"
          type={"password"}
          required
        />
        <br />
        <button type="submit" data-testid="login-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
