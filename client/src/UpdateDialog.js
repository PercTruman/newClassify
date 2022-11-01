import React, { useState, useContext } from "react";
import { UserContext } from "./context/UserContext";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function UpdateDialog({ name, time, room_number }) {
  const [open, setOpen] = React.useState(false);
  const [dialogFormData, setDialogFormData] = useState({
    name: "",
    room_number: "",
    time: "",
    teacher: "",
    user_id: "",
  });
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
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
        time: dialogFormData.time,
        user_id: user.id,
      }),
    })
      .then((res) => res.json())
      .then((updatedSubject) => {
        console.log(updatedSubject);
        const keptSubjects = user.subjects.filter(
          (subject) => subject.id !== updatedSubject.id
        );
        console.log(keptSubjects);
        const newList = [...keptSubjects, updatedSubject];
        console.log(newList);
        setUser((user) => ({ ...user, subjects: newList }));
        navigate("/-subjects");
      });
    handleClose();
  };

  const handleChange = (e) => {
    setDialogFormData({
      ...dialogFormData,
      [e.target.name]: e.target.value,
      user_id: user.id,
    });
  };

  const handleClassDelete = () => {
    fetch(`/subjects/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        const subjectsMinusDeleted = user.subjects.filter(
          (subject) => subject.id != id
        );

        setUser((user) => ({ ...user, subjects: subjectsMinusDeleted }));
        navigate("/-subjects");
      } else {
        res.json().then((errors) => {
          alert(errors.error);
        });
      }
    });
  };

  return (
    <div>
      <Button sx={{ mb: "1rem" }} variant="contained" onClick={handleClickOpen}>
        Edit Details
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={(e) => submitForUpdate(e, id)}>
          <DialogTitle>Edit Class</DialogTitle>
          <DialogContent sx={{ background: "white" }}>
            <DialogContentText>
              To edit this class, make the necessary changes, then click "Save
              Changes."
            </DialogContentText>

            <TextField
              value={dialogFormData.name}
              name="name"
              onChange={handleChange}
              margin="dense"
              id="name"
              label={name}
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
              label={room_number}
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
              label={time}
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
      {/* ) : null} */}
    </div>
  );
}
