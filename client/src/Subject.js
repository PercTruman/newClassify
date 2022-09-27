import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";

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
    <option key={t.id} type="integer" name="t.id" value={t.id}>
      {t.name}
    </option>
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
      <form onSubmit={handleSubmit}>
        <h2>Create New Class</h2>
     
        <TextField
        label = "Name:"
          size="small"
          id="outlined-basic"
          variant="outlined"
          name="name"
          type="text"
          autoComplete="on"
          value={formData.name}
          onChange={handleChange}
        />
       
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
       
        <TextField
        label = "Time"
          name="time"
          size = "small"
          type="text"
          autoComplete="on"
          id="time"
          value={formData.time}
          onChange={handleChange}
        />

        <label> Assign to Teacher:</label>
        <select
          value={formData.teacher_id}
          name="teacher_id"
          onChange={handleChange}
        >
          <option>Choose Teacher</option>
          {dropDownOptions}
        </select>
        <Button sx={{padding:"7px"}}variant= "contained" type = "submit">Add Subject </Button>
      </form>
      <h3>Existing Classes</h3>
      {subjectsList}
    </div>
  );
}

export default Subject;
