import React, {useState, useContext} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Navbar from "./Navbar";
import Box from "@mui/material/Box";
import UpdateDialog from "./UpdateDialog"
import Button from "@mui/material/Button";
import AddStudents from "./AddStudents"

function SubjectDetail() {
  const { user } = useContext(UserContext);
  const { id } = useParams();

  const foundDetails = user && user.subjects.find((subject) => Number(subject.id) == id)
  const courseInstructor = user && user.teachers.find((teacher) => teacher.id === foundDetails.teacher_id)
  const navigate = useNavigate();


  return (
    <div>
      <Navbar />
      <Box sx={{ flexGrow: 1 }}>
        <h2 style={{ textAlign: "center" }}>Class Detail</h2>
      </Box>
      <Box sx={{ flexGrow: 1, textAlign:"center"}}>
        { user ?
            <div>
              <h3>Class: {foundDetails.name}</h3>
              <h3>Time: {foundDetails.time}</h3> 
              <h3>Location: {foundDetails.room_number}</h3> 
              <h3>Teacher: {courseInstructor.name}</h3> 
            </div>
            :
            null
        }
           <UpdateDialog
           foundDetails={foundDetails}
           courseInstructor={courseInstructor}
          /> 
            {/* <Button
            sx={{ mt: 2, mb: 2 }}
            variant="contained"
            onClick={() => navigate(`/-subjects/${foundDetails.id}`)}
          >
            Add Students
          </Button> */}
        <AddStudents/> 
      </Box>
    </div>
  );
}
export default SubjectDetail;
