import React, { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Box from "@mui/material/Box";
import UpdateDialog from "./UpdateDialog";
import AddStudents from "./AddStudents";

function SubjectDetail() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const {name, room_number, time, teacher_id} = location.state
  const thisTeachersName =
    user &&
    user.teachers.map((teacher) =>
      Number(teacher.id) === teacher_id ? teacher.name : null
    ).filter(value => value !== null);

  return (
    <div>
      <Navbar />
      <Box sx={{ flexGrow: 1 }}>
        <h2 style={{ textAlign: "center" }}>Class Detail</h2>
      </Box>
      <Box sx={{ flexGrow: 1, textAlign: "center" }}>
        <div>
          <h3>Class: {name}</h3>
          <h3>Time: {time}</h3>
          <h3>Location: {room_number}</h3>
          <h3>Teacher: {thisTeachersName}</h3>
        </div>
        <UpdateDialog
          name={name}
          time={time}
          room_number={room_number}
          teacher_id={teacher_id}
        />
        <AddStudents />
      </Box>
    </div>
  );
}
export default SubjectDetail;
