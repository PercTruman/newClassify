import React, { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
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
  }
    if (loggedIn) {
      return (
        <div>
          <h2>Navbar Component</h2>
           
          <h3>Hello {user.name}</h3>
          <button onClick={logoutUser}>Logout</button>
          <hr />
        </div>
      );
    } else {
      return (
        <div>
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

export default Navbar
