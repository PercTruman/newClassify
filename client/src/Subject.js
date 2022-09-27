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

  const { teachers, subjects, setSubjects } = useContext(UserContext);
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
    <Item
      key={s.id}
      sx={{
        backgroundColor: "#A5ADB5",
        width: "40%",
        minWidth: "300px",
        margin: "20px",
      }}
    >
      <h3>Subject: {s.name}</h3>
      <h3>Teacher: {s.teacher.name}</h3>
      <h3>Room: {s.room_number}</h3>
      <h3>Time: {s.time}</h3>

      <UpdateDialog key={s.id} id={s.id} />
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        onClick={() => navigate(`/subjects/${s.id}`)}
      >
        Add Students to {s.name}
      </Button>
      {/* <AddStudentsDialog key={s.name} subjectId={s.id} /> */}
    </Item>
  ));

  return (
    <div>
      <Navbar />
      {/* <button onClick={() => navigate("/home")}>Back to Main Page</button> */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid sx={{justifyContent:"center"}} container spacing={2}>
          <form onSubmit={handleSubmit}>
            <h2>Create New Class</h2>

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
                <InputLabel> Assign to Teacher</InputLabel>
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
              sx={{ mb: "5em", padding: "7px" }}
              variant="contained"
              type="submit"
            >
              Add Subject{" "}
            </Button>
          </form>
        </Grid>
      </Box>
      <h2>Existing Classes</h2>
      {subjectsList}
    </div>
  );
}

export default Subject;
