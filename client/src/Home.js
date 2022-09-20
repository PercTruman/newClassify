import React, { useContext } from "react";
import { UserContext } from "./context/UserContext";
import Navbar from "./Navbar";
import { useTheme } from "@mui/material/styles";

const Home = () => {
  const theme = useTheme();

  const { user } = useContext(UserContext);

  return user ? (
    <div>
      <Navbar />
      <h3>{user.username}'s Homepage</h3>
    </div>
  ) : (
    <h3>Loading...</h3>
  );
};

export default Home;
