import React, { useState, useContext } from "react";
import { UserContext } from "./context/UserContext";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function UpdateDialog({ id, teacher, room, time }) {
  const { subjects, setSubjects } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [dialogFormData, setDialogFormData] = useState({
    name: "",
    room_number: "",
    time: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitForUpdate = (e, id) => {
    e.preventDefault();
    fetch(`/subjects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: dialogFormData.name,
        room_number: dialogFormData.room_number,
        time: dialogFormData.time
      }),
    })
      .then((res) => res.json())
      .then((updatedSubject) => {
        const updatedSubjectList = subjects.map((s) =>
          s.id === Number(updatedSubject.id) ? updatedSubject : s
        );
        setSubjects(updatedSubjectList);
      });

    handleClose();
  };
  const handleChange = (e) => {
    setDialogFormData({ ...dialogFormData, [e.target.name]: e.target.value });
  };
  const handleClassDelete = (deletedSubjectId) => {
    fetch(`/subjects/${id}`, {
        method: "DELETE"
  })
   
    .then((res) =>{  if (res.ok) {
       
           setSubjects(subjects.filter((s) =>(s.id !== deletedSubjectId ? s : null )))
        
      } else {
        res.json().then((errors) => {
          alert(errors.error);
        });
      }}

    
    )}

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Edit Class Details
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={(e) => submitForUpdate(e, id)}>
          <DialogTitle>Edit Class</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To edit this class, make the necessary changes, then click "Save
              Changes."
            </DialogContentText>

            <TextField
              value={dialogFormData.name}
              name ="name"
              onChange={handleChange}
              margin="dense"
              id="name"
              label="Class Name"
              type="text"
              fullWidth
              variant="standard"
            />

            <TextField
              value={dialogFormData.room_number}
              name="room_number"
              onChange={handleChange}
              margin="dense"
              id="room_number"
              label="Room Number"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              value={dialogFormData.time}
              name="time"
              onChange={handleChange}
              margin="dense"
              id="time"
              label="Time"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" id={id}>
              Save Changes
            </Button>
            <Button
              onClick={() => {
                handleClassDelete(id);
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