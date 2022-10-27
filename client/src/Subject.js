import React, { useState, useContext, useEffect} from "react";
import { useNavigate} from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Paper from "@mui/material/Paper";
import CreateClassForm from "./CreateClassForm";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Navbar from "./Navbar";

function Subject() {
  const { user} = useContext(UserContext);
  const [showClassForm, setShowClassForm] = useState(false);
  const [theseSubjects, setTheseSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTheseSubjects(user && user.subjects);
  }, [user]);

  function updateSubjectDisplay(theseSubjectsList){
      setTheseSubjects(theseSubjectsList);  
  }

  const subjectsList =  theseSubjects && theseSubjects.map((s) => (
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
            <Button
              sx={{ mb: "1rem" }}
              variant="contained"
              onClick={() => navigate(`/-subjects/${s.id}`, { state: {id: s.id, name: s.name, room_number: s.room_number, time: s.time, teacher_id: s.teacher_id}} )}
            >
              Details
            </Button>
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
      {showClassForm ? <CreateClassForm updateSubjectDisplay={updateSubjectDisplay}/> : null}
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
