import React, { useState, useContext } from "react";
import { UserContext } from "./context/UserContext";
import Navbar from "./Navbar";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function Teacher() {
  const theme = useTheme();

  const { user, teachers, setTeachers } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/teachers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((newTeacher) => {
          const updatedTeacherList = [...teachers, newTeacher];
          setTeachers(updatedTeacherList);
          setFormData({ name: "" });
        });
      } else {
        res.json().then((errors) => {
          alert(errors.error);
        });
      }
    });
  };
  const teachersList = teachers.map((t) => 
      <Grid 
          item 
          key={t.id}
          sx={{
            width: "40%",
         
            maxWidth: "50px",
            // padding: "20px",
            margin: "auto",
            textAlign: "center",
          }}>{t.name}

      </Grid>);
  return user ? (
    <div>
      <Navbar />
      {/* <h3>{user.username}'s Homepage</h3> */}
        <Box sx={{flexGrow:1}}>
          <Grid sx={{ justifyContent: "center" }} container spacing={2}>
          <form onSubmit={handleSubmit}>
            <h2>Add Teacher</h2>
         
            <TextField 
            label="Name"
            size = "small"
              name="name"
              type="text"
              autoComplete="on"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Button variant = "contained" type="submit">Add Teacher</Button>
          </form>
          </Grid>
          </Box>
          <Grid container>
        
            <Grid>
          <h2>Current Teachers</h2>
          {teachersList}
          </Grid>
          </Grid>
      
    </div>
  ) : (
    <div>
      <h2>Loading Teachers...</h2>
    </div>
  );
}

export default Teacher;
