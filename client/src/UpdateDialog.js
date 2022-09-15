import  React, {useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [dialogFormData, setDialogFormDate] = useState({
    name: "",
    room_number: "",
    time: "",

  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitForUpdate= (e)=>{
    
    handleClose();
  }
  const handleDialogFormChange =()=>{}
  const handleClassDelete =()=>{}


  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        {/* Add Students to {.name} */}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={(e)=>submitForUpdate(e)}>
          <DialogTitle>Edit Class</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To edit this class, make the necessary changes, then click
              "Update."
            </DialogContentText>

            <TextField
              value={dialogFormData.name}
              name="name"
              onChange={handleDialogFormChange}
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
              onChange={handleDialogFormChange}
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
              onChange={handleDialogFormChange}
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
            <Button type="submit" >
              Save Changes
            </Button>
            <Button onClick={()=> {handleClassDelete(); handleClose();}}>Delete Class</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
