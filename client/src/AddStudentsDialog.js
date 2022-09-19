import React, { useContext, useState } from "react";
import { UserContext } from "./context/UserContext";

import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function AddStudentsDialog({ subjectId }) {
  const { students } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [checkedState, setCheckedState] = useState(
    new Array(students.length).fill(false)
  );
//   const [classArray, setClassArray] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        value={s.name}
        checked={checkedState[index]}
        onChange={() => handleOnChange(index, s.id)}
      />
      <label htmlFor={`custom-checkbox-${index}`}>{s.name}</label>
    </div>
  ));

  const submitForUpdate = (e, subjectId) => {
    e.preventDefault();
    const indexArray = checkedState.map((value, index) =>{
         if (value == true){
            return index;
        }
    })
    .filter(element => element != undefined).map(indexValue => indexValue + 1)
console.log(indexArray);
console.log(subjectId)
const valuePairs = indexArray.map(number => [subjectId, number])
console.log(valuePairs)
   

    fetch("/student_subjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        //    student_id:,
        subject_id: subjectId,
      }),
    }).then((res) => res.json());
    //   .then((updatedSubject) => {
    //     const updatedSubjectList = subjects.map((s) =>
    //       s.id === Number(updatedSubject.id) ? updatedSubject : s
    //     );
    //     setSubjects(updatedSubjectList);
    //   });;
  };
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Students
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={(e) => submitForUpdate(e, subjectId)}>
          <DialogTitle>Add Students to Class</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a student to this class, click the checkbox next to their
              name.
            </DialogContentText>

            {studentCheckboxes}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add students</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default AddStudentsDialog;
