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
    fetch("/api/teachers", {
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
          setFormData({ name: "" });
        });
      }
    });
  };
  const teachersList = teachers.map((t) => (
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
  return user ? (
    <div>
      <Navbar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid sx={{ justifyContent: "center" }} container spacing={2}>
          <form onSubmit={handleSubmit}>
            <h2 style = {{marginLeft:"8rem"}}>Add Teacher</h2>

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
  ) : (
    <div>
      <h2>Loading Teachers...</h2>
    </div>
  );
}

export default Teacher;
