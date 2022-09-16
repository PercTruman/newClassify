import React, { useContext } from "react";
import { UserContext } from "./context/UserContext";

import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function AddStudentsDialog({subjectId}) {
  const { students } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const studentCheckboxes = students.map((s) => (
    <div>
        <label>{s.name}</label>
      <Checkbox value={s.id}/>
      {/* {s.name} */}
    </div>

    
  ))
  
  const submitForUpdate = (e, subjectId) => {
    e.preventDefault();
    fetch('/student_subjects', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
    //    student_id:,
       subject_id: subjectId
      }),
    })
      .then((res) => res.json())
    //   .then((updatedSubject) => {
    //     const updatedSubjectList = subjects.map((s) =>
    //       s.id === Number(updatedSubject.id) ? updatedSubject : s
    //     );
    //     setSubjects(updatedSubjectList);
    //   });;
  }
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
              To add a student to this class, click the checkbox next to their name.
            </DialogContentText>

            {studentCheckboxes}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" >
              Save Changes
            </Button>
            <Button
              onClick={() => {
                // handleClassDelete();
                handleClose();
              }}
            >
              Delete Class
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}


export default AddStudentsDialog;
