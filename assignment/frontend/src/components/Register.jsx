/** @format */

import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../redux/actionCreators/authActions";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      register({
        name,
        email,
        password,
        passwordConfirmation,
      })
    );
  };

  return (
    <div data-testid="register-component">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} data-testid="register-form">
        <label htmlFor="text">Name</label>
        <input
          name="text"
          data-testid="name-input"
          type={"text"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />

        <label htmlFor="email">Email</label>
        <input
          name="email"
          data-testid="email-input"
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          data-testid="password-input"
          type={"password"}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <label htmlFor="passwordConfirmation">Password Confirmation</label>
        <input
          name="passwordConfirmation"
          data-testid="passwordConfirmation-input"
          type={"password"}
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />
        <br />
        <button type="submit" data-testid="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
