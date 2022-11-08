import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import Navbar from "./Navbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Welcome from "./Welcome"

function Teacher() {
  const { user, loggedIn, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
  });
  const [theseTeachers, setTheseTeachers] = useState([]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      user_id: user.id,
    });
  };

  useEffect(() => {
    setTheseTeachers(user && user.teachers);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/teachers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((newTeacherList) => {
          setUser({...user, teachers: newTeacherList})
          setFormData({ name: "", user_id: "" });
        });
      } else {
        res.json().then((errors) => {
          alert(errors.error);
          setFormData({ name: "", user_id: "" });
        });
      }
    });
  };
  
  const teachersList =
    theseTeachers &&
    theseTeachers.map((t) => (
      <Grid
        item
        key={t.id}
        sx={{
          padding: "10px",
          margin: "auto",
          textAlign: "center",
        }}
      >
        {t.name}
      </Grid>
    ));

    if(loggedIn) {
  return (
    <div>
      <Navbar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid sx={{ justifyContent: "center" }} container spacing={2}>
          <form onSubmit={handleSubmit}>
            <h2 style={{ marginLeft: "8rem" }}>Add Teacher</h2>

            <TextField
              label="Name"
              size="small"
              name="name"
              type="text"
              autoComplete="on"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Button
              sx={{ marginLeft: "2rem" }}
              variant="contained"
              type="submit"
            >
              Add Teacher
            </Button>
          </form>
        </Grid>
      </Box>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid>
          <h2 style={{ marginTop: "4rem" }}>Current Faculty</h2>
          {teachersList}
        </Grid>
      </Grid>
    </div>
  )
} else {
  return (
  <Welcome />
  )
}
}
 

export default Teacher;
