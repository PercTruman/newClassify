import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

function Welcome() {
  const theme = useTheme();

  return (
    <div>
      <h2>Welcome to Class-ify, your hub for students and their assignments. Please
      login or signup.</h2>
      <NavLink to="/login">
        <button>Login</button>
      </NavLink>
      <NavLink to="/signup">
        <button>Signup</button>
      </NavLink>
    </div>
  );
}

export default Welcome;
