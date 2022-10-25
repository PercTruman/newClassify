import React, { useContext } from "react";
import { useParams} from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Navbar from "./Navbar";
import Box from "@mui/material/Box";
import UpdateDialog from "./UpdateDialog";
import AddStudents from "./AddStudents";

function SubjectDetail() { 
  const { user } = useContext(UserContext);
  const { id } = useParams();
  

  const foundDetails = user.subjects.find((subject) =>  subject.id == id);
  const courseInstructor = user.teachers.find((teacher) => teacher.id == foundDetails.teacher_id);


  return (
    <div>
      <Navbar />
      <Box sx={{ flexGrow: 1 }}>
        <h2 style={{ textAlign: "center" }}>Class Detail</h2>
      </Box>
      <Box sx={{ flexGrow: 1, textAlign: "center" }}>
        {user ? (
          <div>
            <h3>Class: {foundDetails.name}</h3>
            <h3>Time: {foundDetails.time}</h3>
            <h3>Location: {foundDetails.room_number}</h3>
            <h3>Teacher: {courseInstructor.name}</h3>
          </div>
        ) : null}
        <UpdateDialog
          foundDetails={foundDetails}
          courseInstructor={courseInstructor}
          // theseSubjects = {theseSubjects}
        />
        <AddStudents />
      </Box>
    </div>
  );
}
export default SubjectDetail;
