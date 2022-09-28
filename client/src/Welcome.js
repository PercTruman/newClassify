import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

function Welcome() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <div>
      <Grid container sx={{ justifyContent: "center" }} spacing={2}>
        <Grid item sx={{ textAlign: "center" }}>
          <h2 style={{ width: "100%", textAlign: "center" }}>
            Welcome to Class-ify, your hub for campus logistics! Please login or
            signup.
          </h2>
        </Grid>
        </Grid>
        <br/>
        <Grid container sx={{ justifyContent: "center" }} spacing={2}>
        <Grid item>
          <Button variant="contained" sx = {{m:"1rem"}}onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button variant="contained" onClick={() => navigate("/signup")}>
            Signup
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Welcome;
