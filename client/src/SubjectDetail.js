import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Box from "@mui/material/Box";
import UpdateDialog from "./UpdateDialog";
import AddStudents from "./AddStudents";

function SubjectDetail() {
  // const { user } = useContext(UserContext);
  const location = useLocation()
  // const [thisSubject, setThisSubject] = useState(null);
  // const [thisInstructor, setThisInstructor] = useState(null);

  // useEffect(() => {
  //   setThisSubject(user && user.subjects.find((subject) => subject.id == id));
  //   setThisInstructor(
  //     user &&
  //       thisSubject &&
  //       user.teachers.find(
  //         (teacher) => Number(teacher.id) === thisSubject.teacher_id
  //       )
  //   );
  // }, [user, id, thisSubject, thisInstructor]);

  // function updateSubjectDetails(newData) {
  //   setThisSubject(newData);
  // }
 

  // if (!thisSubject || !thisInstructor) return (<h1>Loading...</h1>);

  return (
    <div>
      <Navbar />
      <Box sx={{ flexGrow: 1 }}>
        <h2 style={{ textAlign: "center" }}>Class Detail</h2>
      </Box>
      <Box sx={{ flexGrow: 1, textAlign: "center" }}>
        <div>
          <h3>Class: {location.state.name}</h3>
          <h3>Time: {location.state.time}</h3>
          <h3>Location: {location.state.room_number}</h3>
          <h3>Teacher: {location.state.name}</h3>
        </div>
        <UpdateDialog
          name={location.state.name}
          time={location.state.time}
          room_number={location.state.room_number}
          teacher ={location.state.name}
        />
        <AddStudents />
      </Box>
    </div>
  );
}
export default SubjectDetail;
