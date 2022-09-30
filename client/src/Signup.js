import React, { useState, useContext } from "react";
import { UserContext } from "./context/UserContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Signup = () => {
  const theme = useTheme();

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { signup, errorsList, setErrorsList } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (!user.errors) {
          signup(user);
          navigate("/home");
        } else {
          setUsername("");
          setEmail("");
          setPassword("");
          setPasswordConfirmation("");
          const errorLis = user.errors.map((e) => <li>{e}</li>);
          setErrorsList(errorLis);
        }
      });
  };

  return (
    <div>
      <h2> SignUp Component</h2>
      <form onSubmit={handleSubmit}>
        <label>Create Username:</label>
        <input
          type="text"
          autoComplete="on"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Email Address:</label>
        <input
          type="email"
          autoComplete="on"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br />
        <label>Password:</label>
        <input
          type="password"
          autoComplete="on"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label>Password Confirmation:</label>
        <input
          type="password"
          autoComplete="on"
          id="passwordConfirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <br />
        <button type="submit">Add Adminstrator</button>
      </form>
      <ul>{errorsList}</ul>
    </div>
  );
};

export default Signup;
