import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

function Welcome() {
  const theme = useTheme();

  return (
    <div>
      Welcome to Class-ify, your hub for students and their assignments. Please
      login or signup.
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
