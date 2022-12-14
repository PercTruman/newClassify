import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import Navbar from "./Navbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Welcome from "./Welcome"

function Student() {
  const { user, setUser, loggedIn } = useContext(UserContext);
  const [theseStudents, setTheseStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    user_id: "",
  });


  useEffect(() => {
    setTheseStudents(user && user.students);
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      user_id: user.id,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((newStudentList) => {
          setUser({...user, students: newStudentList})
          setFormData({ name: "", user_id: "" });
        });
      } else {
        res.json().then((errors) => {
          alert(errors.error);
          setFormData({ name: "", user_id: "" });
        });
      }
    });
  };

  const studentsList =
    user &&
    user.students.map((s) => (
      <Grid
        key={s.id}
        sx={{ padding: "10px", margin: "auto", textAlign: "center" }}
      >
        {s.name}
      </Grid>
    ));
 if (loggedIn){
     return (
        <div>
          <Navbar />
          <Box sx={{ flexGrow: 1 }}>
            <Grid sx={{ justifyContent: "center" }} container spacing={2}>
              <form onSubmit={handleSubmit}>
                <h2 style={{ textAlign: "center" }}>Add Student</h2>

                <TextField
                  size="small"
                  name="name"
                  type="text"
                  autoComplete="on"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <Button
                  sx={{ marginLeft: "2rem" }}
                  variant="contained"
                  type="submit"
                >
                  Add Student
                </Button>
              </form>
            </Grid>
          </Box>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid>
              <h2 style={{ marginTop: "4rem" }}> Current Students</h2>
              {studentsList}
            </Grid>
          </Grid>
        </div>
      )
    } else {
      return (
      <Welcome />
      )
    }
  }


export default Student;
