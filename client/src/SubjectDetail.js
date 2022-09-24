import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { UserContext } from "./context/UserContext";
import Navbar from "./Navbar";
import Student from "./Student";
import { es } from "date-fns/locale";

function SubjectDetail() {
  const theme = useTheme();
  const { students, subjects } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [checkedState, setCheckedState] = useState([]);
  const [studentIds, setStudentIds] = useState([]);
  const [targetSubject, setTargetSubject] = useState([]);
  const [enrolledStudents, setEnrolledStudents] = useState([]);

  useEffect(() => {
    setCheckedState(new Array(students.length).fill(false));
    setStudentIds(students.map((student) => student.id));
    setTargetSubject(subjects.find((subject) => subject.id === parseInt(id)));
  }, [students, subjects]);

  useEffect(() => {
    if (targetSubject) setEnrolledStudents(targetSubject.students);
  }, [targetSubject]);

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
        indexArray,
      }),
    })
      .then((res) => res.json())
      .then((student_subject_array) =>
        addStudentNamesToList(student_subject_array)
      );
  };

  function addStudentNamesToList(array) {
    const studentIndexes = array.map((a) => a.student_id); //returns indexes from backend
   
    const enrolledStudentIndexes = enrolledStudents.map(es => es.id) //grabs currently enrolled students' indexes
  
    const totalOfStudentIndexes = studentIndexes.concat(enrolledStudentIndexes) //merges 2 previous arrays into one array
   
    const onlyUniqueIndexes = [...new Set(totalOfStudentIndexes)] //removes duplicate indexes

    const studentsForDisplay = students.filter((s) => onlyUniqueIndexes.includes(s.id) ? s : null)
    // const filteredStudents =  // finds students objects whose ids have come back from backend
    //   studentIndexes.includes(s.id))
    //   console.log(filteredStudents)
    
    
    // console.log(studentsForDisplay)
    
    setEnrolledStudents(studentsForDisplay)
  }

  if (!targetSubject || !enrolledStudents) return <h2>Loading...</h2>;

  const displayedStudents = enrolledStudents.map((student) => (
    <div key={student.id}>
      <h5>{student.name}</h5>
    </div>
  ));

  if (subjects) {
    return (
      <div>
        <Navbar />
        <h1>Class Detail Page</h1>
        <button onClick={() => navigate("/subjects")}>
          Back to Subjects Main Page
        </button>
        <form onSubmit={submitForUpdate}>
          {studentCheckboxes}
          <button type="submit">Add Students</button>
        </form>
        <h3>Currently Enrolled Students:</h3>
        {displayedStudents}
      </div>
    );
  } else {
    return <h2>Loading...</h2>;
  }
}
export default SubjectDetail;
