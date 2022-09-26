import React, { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Navbar = () => {
  const theme = useTheme();

  const { user, logout, loggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const logoutUser = (user) => {
    fetch("/logout", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      logout();
      navigate("/");
    });
  };
  if (loggedIn) {
    return (
      <div >
        <h2 > {theme.typography.fontFamily}Navbar Component</h2>

        <h3>Hello {user.username}</h3>
        <button onClick={logoutUser}>Logout</button>
        <button onClick={() => navigate("/teachers")}>Add Teacher</button>
        <button onClick={() => navigate("/students")}>Add Student</button>
        <button onClick={() => navigate("/subjects")}>Create New Class</button>
        <hr />
      </div>
    );
  } else {
    return (
      <div>
        <h1>Please Sign In</h1>
        <h2>Navbar Component</h2>
        <NavLink to="/login">
          <button>Login</button>
        </NavLink>
        <NavLink to="/signup">
          <button>Signup</button>
        </NavLink>
        <hr />
      </div>
    );
  }
};

export default Navbar;
