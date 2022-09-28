import React, { useState, useContext } from "react";
import { UserContext } from "./context/UserContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";

const Login = () => {
  const theme = useTheme();

  const { login, errorsList } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((teacher) => {
          login(teacher);
          navigate("/home");
        });
      } else {
        res.json().then((errors) => {
          alert(errors.error);
        });
      }
    });
  };

  return (
    <div>
      <Grid sx={{ justifyContent: "center" }} container spacing={2}>
        <Grid item>
      <form onSubmit={handleSubmit}>
        <h2 style = {{marginLeft:"4rem"}}>Login</h2>
        <TextField 
        sx={{marginBottom: "2rem"}}
          size = "small"
          label="Username"
          name="username"
          type="text"
          autoComplete="on"
          id="username"
          value={formData.username}
          onChange={handleChange}
        />{" "}
        <br />
        
        <TextField 
          label = "Password"
          size = "small"
          name="password"
          type="password"
          autoComplete="on"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <Button sx={{ marginLeft: "4rem", marginTop: "2rem" }} variant="contained" onClick={() => navigate("/")}>
           Back
          </Button>
      </form>
      </Grid>
    
      <ul>{errorsList}</ul>
      </Grid>
    </div>
  );
};

export default Login;
