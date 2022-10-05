import React, { useState, useContext } from "react";
import { UserContext } from "./context/UserContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";

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
    fetch("/signup", {
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
      <Grid sx={{ justifyContent: "center" }} container spacing={2}>
      <Grid item>
      <h2> SignUp for Classify</h2>
      <form onSubmit={handleSubmit}>
        <TextField
           sx={{marginBottom: "2rem"}}
           size = "small"
           label = "Username"
           name="username"
          type="text"
          autoComplete="on"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <TextField
           sx={{marginBottom: "2rem"}}
           size = "small"
           label = "Email"
           name="email"
          type="email"
          autoComplete="on"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br />
        <TextField
           sx={{marginBottom: "2rem"}}
           size = "small"
           label = "Password"
           name="password"
          type="password"
          autoComplete="on"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
      
        <TextField
           sx={{marginBottom: "2rem"}}
           size = "small"
           label = "Password Confirmation"
           name="Password Confirmation"
          type="password"
          autoComplete="on"
          id="passwordConfirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <br />
        <Button variant="contained" type="submit">Add Adminstrator</Button>
        <Button variant="contained" onClick={()=>navigate('/')}>Back</Button>
      </form>
      </Grid>
      <ul>{errorsList}</ul>
      </Grid>
    </div>
  );
};

export default Signup;
