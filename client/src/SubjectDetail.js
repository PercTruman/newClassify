import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { UserContext } from "./context/UserContext";
import Navbar from "./Navbar";

function SubjectDetail() {
  const theme = useTheme();
  const { students } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [checkedState, setCheckedState] = useState([]);

  useEffect(() => {
    setCheckedState(new Array(students.length).fill(false));
  }, [students]);

  const handleOnChange = (position, studentId) => {
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
        // checked=
        onChange={() => handleOnChange(index, s.id)}
      />
      <label htmlFor={`custom-checkbox-${index}`}>{s.name}</label>
    </div>
  ));
  const submitForUpdate = (e, subjectId) => {
    e.preventDefault();
    const indexArray = checkedState
      .map((value, index) => {
        if (value === true) {
          return index;
        }
      })
      .filter((element) => element != undefined)
      .map((indexValue) => indexValue + 1);

    // const valuePairs = indexArray.map((number) => [number, subjectId]);

    fetch(`/student_subjects/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        indexArray,
      }),
    }).then((res) => res.json());
  };

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
    </div>
  );
}

export default SubjectDetail;
