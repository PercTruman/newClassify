import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";

import UpdateDialog from "./UpdateDialog";
import Navbar from "./Navbar";
// import AddStudentsDialog from "./AddStudentsDialog";

function Subject() {
  const theme = useTheme();

  const { teachers, subjects, setSubjects, errorsList, setErrorsList } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    room_number: "",
    time: "",
    teacher_id: "",
  });

  const navigate = useNavigate();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/subjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((newSubject) => {
          const updatedSubjectList = [...subjects, newSubject];
          setSubjects(updatedSubjectList);
          setFormData({
            name: "",
            room_number: "",
            time: "",
            teacher_id: "",
          });
        });
      } else {
       
        res.json().then((errors) => {
         alert(errors.error);
        });
      }
    });
  };

  const dropDownOptions = teachers.map((t) => (
    <MenuItem key={t.id} type="integer" name="t.id" value={t.id}>
      {t.name}
    </MenuItem>
  ));

  const subjectsList = subjects.map((s) => (
    <Grid
      item
      key={s.id}
      sx={{
        width: "40%",
        minWidth: "200px",
        maxWidth: "400px",
        padding: "20px",
        margin: "20px",
        textAlign: "center",
      }}
    >
      <Paper elevation={24} sx={{paddingTop: "1rem"}}>
        <h3>Subject: {s.name}</h3>
        <h3>Teacher: {s.teacher.name}</h3>
        <h3>Room: {s.room_number}</h3>
        <h3>Time: {s.time}</h3>

        <UpdateDialog key={s.id} id={s.id} />
        <Button
          sx={{ mt: 2, mb: 2 }}
          variant="contained"
          onClick={() => navigate(`/-subjects/${s.id}`)}
        >
          Add Students to {s.name}
        </Button>
      </Paper>
    </Grid>
  ));

  return (
    <div>
      <Navbar />

      <Box sx={{  flexGrow: 1 }}>
        <Grid sx={{ justifyContent: "center" }} container spacing={2}>
          <form onSubmit={handleSubmit}>
            <h2 style={{marginTop:"3rem", marginLeft:"2rem"}}>Create New Class</h2>

            <Grid xs>
              <TextField
                label="Name:"
                size="small"
                id="outlined-basic"
                variant="outlined"
                name="name"
                type="text"
                autoComplete="on"
                value={formData.name} 
                onChange={handleChange}
              />
            </Grid>
            <Grid xs>
              <TextField
                size="small"
                label="Room Number:"
                name="room_number"
                type="text"
                autoComplete="on"
                id="room_number"
                value={formData.room_number}
                onChange={handleChange}
              />
            </Grid>
            <Grid xs>
              <TextField
                label="Time"
                name="time"
                size="small"
                type="text"
                autoComplete="on"
                id="time"
                value={formData.time}
                onChange={handleChange}
              />
            </Grid>

            <Box sx={{ maxWidth: "100%" }}>
              <FormControl fullWidth sx={{ mb: "1em" }}>
                <InputLabel> Assign to Professor</InputLabel>
                <Select
                  value={formData.teacher_id}
                  name="teacher_id"
                  onChange={handleChange}
                >
                  {dropDownOptions}
                </Select>
              </FormControl>
            </Box>
            <Button
              sx={{ mb: "5em", marginLeft: "4em", padding: "7px" }}
              variant="contained"
              type="submit"
            >
              Add Subject{" "}
            </Button>
            <ul>{errorsList}</ul>
          </form>
        </Grid>
      </Box>
      <Box sx={{textAlign:"center" }}><h2>Existing Classes</h2></Box>
      <Grid container justifyContent={"center"}>{subjectsList}</Grid>
    </div>
  );
}

export default Subject;
