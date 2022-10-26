import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Navbar from "./Navbar";
import Box from "@mui/material/Box";
import UpdateDialog from "./UpdateDialog";
import AddStudents from "./AddStudents";

function SubjectDetail() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [thisSubject, setThisSubject] = useState([])
  const [thisInstructor, setThisInstructor] = useState(null)

  useEffect (()=> {
    setThisSubject(user && user.subjects.find((subject) => subject.id == id))
    setThisInstructor(user && thisSubject && user.teachers.find(
      (teacher) => Number(teacher.id) === thisSubject.teacher_id
    ))
  }, [user, id, thisSubject])

  function updateSubjectDetails(newData) {
    setThisSubject(newData);
  }


  return (
    user && thisSubject && thisInstructor ? (
    <div>
      <Navbar />
      <Box sx={{ flexGrow: 1 }}>
        <h2 style={{ textAlign: "center" }}>Class Detail</h2>
      </Box>
      <Box sx={{ flexGrow: 1, textAlign: "center" }}>
        {thisSubject && thisInstructor ? (
          <div>
            <h3>Class: {thisSubject.name}</h3>
            <h3>Time: {thisSubject.time}</h3>
            <h3>Location: {thisSubject.room_number}</h3>
            <h3>Teacher: {thisInstructor.name}</h3>
          </div>
        ) : null}
        <UpdateDialog
          thisSubject={thisSubject}
          thisInstructor={thisInstructor}
          updateSubjectDetails={updateSubjectDetails}
        />
        <AddStudents />
      </Box>
    </div>
    ) : null
  )
}
export default SubjectDetail;
