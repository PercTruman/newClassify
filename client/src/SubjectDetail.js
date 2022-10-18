import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Navbar from "./Navbar";
import Box from "@mui/material/Box";
// import Grid from "@mui/material/Unstable_Grid2";
// import Button from "@mui/material/Button";

function SubjectDetail() {
  const { user } = useContext(UserContext);
  const { id } = useParams();




  const foundDetails = user && user.subjects.find((subject) => Number(subject.id) == id)
  const courseInstructor = user && user.teachers.find((teacher) => teacher.id === foundDetails.teacher_id)
 console.log(user.teachers)
 console.log(courseInstructor)


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
            null }
      </Box>
    </div>
  );
}
export default SubjectDetail;
