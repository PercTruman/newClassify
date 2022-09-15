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
  const handleStudentDelete =()=>{}


  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        {/* Add Students to {.name} */}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={(e)=>submitForUpdate(e)}>
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To edit this model, make the necessary changes, then click
              "Update."
            </DialogContentText>

            <TextField
              value={dialogFormData.number_in_collection}
              name="number_in_collection"
              onChange={handleDialogFormChange}
              margin="dense"
              id="number_in_collection"
              label="Number in Collection"
              type="number"
              fullWidth
              variant="standard"
            />

            <TextField
              value={dialogFormData.unit_points_cost}
              name="unit_points_cost"
              onChange={handleDialogFormChange}
              margin="dense"
              id="unit_points_cost"
              label="Unit Points Cost"
              type="number"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" >
              Update
            </Button>
            <Button onClick={()=> {handleStudentDelete(); handleClose();}}>Delete</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
