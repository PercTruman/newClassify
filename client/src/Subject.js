import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Paper from "@mui/material/Paper";
import CreateClassForm from "./CreateClassForm";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import UpdateDialog from "./UpdateDialog";
import Navbar from "./Navbar";

function Subject() {
  const { user, errorsList } = useContext(UserContext);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();
  const [showClassForm, setShowClassForm] = useState(false)

  useEffect(() => {
    getUserTeachers();
    getUserSubjects();
  }, []);

  function getUserSubjects() {
    fetch("/subjects")
      .then((res) => res.json())
      .then((data) => setSubjects(data));
  }
  function getUserTeachers() {
    fetch("/teachers")
      .then((res) => res.json())
      .then((returnedTeachers) => setTeachers(returnedTeachers));
  }

  const subjectsList =
    user &&
    subjects &&
    subjects.map((s) => (
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
        <Paper elevation={24} sx={{ paddingTop: "1rem" }}>
          <h3>Subject: {s.name}</h3>
          {/* <h3>Teacher: {s.teacher.name}</h3>
          <h3>Room: {s.room_number}</h3>
          <h3>Time: {s.time}</h3> */}

          <UpdateDialog
            key={s.id}
            id={s.id}
            subjects={subjects}
            setSubjects={setSubjects}
          />
          <Button
            sx={{ mt: 2, mb: 2 }}
            variant="contained"
            onClick={() => navigate(`/-subjects/${s.id}`)}
          >
            Add Students
          </Button>
        </Paper>
      </Grid>
    ));

  return (
    <div>
      <Navbar />
      <Button
            sx={{ mt: 2, mb: 2 }}
            variant="contained"
            onClick={() => setShowClassForm((!showClassForm))}
          >Create Class</Button>
      {showClassForm ? <CreateClassForm /> : null}
      <Box sx={{ textAlign: "center" }}>
        <h2>Existing Classes</h2>
      </Box>
      <Grid container justifyContent={"center"}>
        {subjectsList}
      </Grid>
    </div>
  );
}

export default Subject;
