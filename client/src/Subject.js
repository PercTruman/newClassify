import React, { useState, useContext} from "react";
import { useNavigate} from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Paper from "@mui/material/Paper";
import CreateClassForm from "./CreateClassForm";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Navbar from "./Navbar";

function Subject() {
  const { user, loggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const [showClassForm, setShowClassForm] = useState(false);

  if (!loggedIn) return null;
  const subjectsList =  user.subjects.map((s) => (
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
            <h3>{s.name}</h3>
            {/* <h3>Teacher: {s.teacher.name}</h3>
          <h3>Room: {s.room_number}</h3>
          <h3>Time: {s.time}</h3> */}
            <Button
              sx={{ mb: "1rem" }}
              variant="contained"
              onClick={() => navigate(`/-subjects/${s.id}`)}
            >
              Details
            </Button>
            {/* <UpdateDialog
            key={s.id}
            id={s.id}
            subjects={subjects}
            setSubjects={setSubjects}
          /> */}
            {/* <Button
            sx={{ mt: 2, mb: 2 }}
            variant="contained"
            onClick={() => navigate(`/-subjects/${s.id}`)}
          >
            Add Students
          </Button> */}
          </Paper>
        </Grid>
      ))
   

  return (
    <div>
      <Navbar />
      <Box sx={{ textAlign: "center" }}>
        <Button
          sx={{ mt: 6, mb: 2 }}
          variant="contained"
          onClick={() => setShowClassForm(!showClassForm)}
        >
          Create New Class
        </Button>
      </Box>
      {showClassForm ? <CreateClassForm /> : null}
      <Box sx={{ textAlign: "center" }}>
        <h2>Classes</h2>
      </Box>
      <Grid container justifyContent={"center"}>
        {subjectsList}
      </Grid>
    </div>
  );
}

export default Subject;
