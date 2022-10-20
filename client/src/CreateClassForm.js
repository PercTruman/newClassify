import React, { useState, useContext } from "react";
import { UserContext } from "./context/UserContext";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

function CreateClassForm() {
  const { user, errorsList } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    room_number: "",
    time: "",
    teacher_id: "",
    user_id: "",
  });
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      user_id: user.id,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/subjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((newSubject) => {
          const updatedSubjectList = [...subjects, newSubject];
          setSubjects(updatedSubjectList);
          setFormData({
            name: "",
            room_number: "",
            time: "",
            teacher_id: "",
            user_id: "",
          });
        });
      } else {
        res.json().then((errors) => {
          alert(errors.error);
        });
      }
    });
  };

  const dropDownOptions = user.teachers.map((t) => (
    <MenuItem key={t.id} type="integer" name="t.id" value={t.id}>
      {t.name}
    </MenuItem>
  ));
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid sx={{ justifyContent: "center" }} container spacing={2}>
          <form onSubmit={handleSubmit}>
            <h2 style={{ marginTop: "3rem", marginLeft: "2rem" }}>
              Create New Class
            </h2>

            <Grid xs>
              <TextField
                label="Name:"
                size="small"
                id="outlined-basic"
                variant="outlined"
                name="name"
                type="text"
                autoComplete="on"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid xs>
              <TextField
                size="small"
                label="Room Number:"
                name="room_number"
                type="text"
                autoComplete="on"
                id="room_number"
                value={formData.room_number}
                onChange={handleChange}
              />
            </Grid>
            <Grid xs>
              <TextField
                label="Time"
                name="time"
                size="small"
                type="text"
                autoComplete="on"
                id="time"
                value={formData.time}
                onChange={handleChange}
              />
            </Grid>

            <Box sx={{ maxWidth: "100%" }}>
              <FormControl fullWidth sx={{ mb: "1em" }}>
                <InputLabel> Assign to Professor</InputLabel>
                <Select
                  value={formData.teacher_id}
                  name="teacher_id"
                  onChange={handleChange}
                >
                  {dropDownOptions}
                </Select>
              </FormControl>
            </Box>
            <Button
              sx={{ mb: "5em", marginLeft: "4em", padding: "7px" }}
              variant="contained"
              type="submit"
            >
              Add Class{" "}
            </Button>
            <ul>{errorsList}</ul>
          </form>
        </Grid>
      </Box>
    </div>
  );
}

export default CreateClassForm;
