import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { useTheme } from "@mui/material/styles";
import { UserContext } from "./context/UserContext";
import Navbar from "./Navbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";

function SubjectDetail() {
  // const theme = useTheme();
  const { user, subjects } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [students, setStudents]= useState([])
  const [checkedState, setCheckedState] = useState([]);
  const [studentIds, setStudentIds] = useState([]);
  const [targetSubject, setTargetSubject] = useState([]);
  const [enrolledStudents, setEnrolledStudents] = useState([]);

  useEffect(() => {
    setCheckedState(new Array(students.length).fill(false));
    setStudentIds(students.map((student) => student.id));
    setTargetSubject(subjects.find((subject) => subject.id === parseInt(id)));
    getUserStudents()
  }, [ subjects]);

  useEffect(() => {
    if (targetSubject) rebuildStudentList(targetSubject.students);
  }, [targetSubject]);

  function getUserStudents() {
    fetch("/students")
    .then(res => res.json())
    .then((returnedStudents) =>
      setStudents(returnedStudents)
    );
  }

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };
  

  const studentCheckboxes = students.map((s, index) => (
    <div key={s.id}>
      <input
        type="checkbox"
        id={`${index}`}
        name={s.name}
        value={checkedState[index]}
        onChange={() => handleOnChange(index)}
      />
      <label htmlFor={`custom-checkbox-${index}`}>{s.name}</label>
    </div>
  ));

  const submitForUpdate = (e) => {
    e.preventDefault();
    const indexArray = checkedState
      .map((value, index) => {
        if (value === true) {
          return studentIds[index];
        } else {
          return null;
        }
      })
      .filter((element) => element !== null);

    fetch(`/student_subjects/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        indexArray, user_id:user.id
      }),
    })
      .then((res) => res.json())
      .then((student_subject_array) =>
        addStudentNamesToList(student_subject_array)
      );
  };

  function addStudentNamesToList(array) {
    const studentIndexes = array.map((a) => a.student_id); //returns indexes from backend
    const enrolledStudentIndexes = enrolledStudents.map((es) => es.id); //grabs currently enrolled students' indexes
    const totalOfStudentIndexes = studentIndexes.concat(enrolledStudentIndexes); //merges 2 previous arrays into one array
    const onlyUniqueIndexes = [...new Set(totalOfStudentIndexes)]; //removes duplicate indexes
    const studentsForDisplay = students.filter((s) =>
      onlyUniqueIndexes.includes(s.id) ? s : null
    );
    rebuildStudentList(studentsForDisplay)
   
  }
  function rebuildStudentList(newList){
    setEnrolledStudents(newList)
  }

  if (!targetSubject || !enrolledStudents) return <h2>Loading...</h2>;

  const displayedStudents = enrolledStudents.map((student) => (
    <Grid
      key={student.id}
      sx={{ padding: "10px", margin: "auto", textAlign: "center" }}
    >
      {student.name}
    </Grid>
  ));

  if (subjects) {
    return (
      <div>
        <Navbar />
        <Box sx={{ flexGrow: 1 }}>
          <h2
            style={{ textAlign: "center" }}
          >{`${targetSubject.name} Detail`}</h2>
          <Grid sx={{ justifyContent: "center" }} container spacing={2}></Grid>
          <Grid
            sx={{ justifyContent: "center" }}
            container
            spacing={2}
            marginBottom="4rem"
          >
            <Grid>
              <form onSubmit={submitForUpdate}>
                {studentCheckboxes}
                <Button
                  sx={{ marginLeft: "2rem", marginTop: "2rem" }}
                  variant="contained"
                  type="submit"
                >
                  Add Students
                </Button>

                <Button
                  variant="contained"
                  onClick={() => navigate("/-subjects")}
                  sx={{ marginLeft: "2rem", marginTop: "2rem" }}
                >
                  Back to All Subjects
                </Button>
              </form>
            </Grid>
          </Grid>
        </Box>
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid>
            <h3>Currently Enrolled Students:</h3>
            {displayedStudents}
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return <h2>Loading...</h2>;
  }
}
export default SubjectDetail;
