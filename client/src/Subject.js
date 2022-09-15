import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import Grid from "@mui/material/Grid";
import UpdateDialog from "./UpdateDialog"


function Subject() {
    const {  teachers } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    room_number: "",
    time: "",
    teacher_id: "",
  });
  const [subjects, setSubjects] = useState([]);
  const  navigate = useNavigate()
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));


  useEffect(() => {
    getSubjects();
  }, []);

  function getSubjects() {
    fetch("/subjects")
      .then((res) => res.json())
      .then((data) => {
        setSubjects(data);
      });
  }
  console.log(subjects)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          });
        });
      } else {
        res.json().then((errors) => {
          alert(errors.error);
        });
      }
    });
  };

  const dropDownOptions = teachers.map((t) => (
    <option type="integer" key={t.id} name="t.id" value={t.id} >
      {t.name}
    </option>

  ));

  const subjectsList = subjects.map((s) => <Item key={s.id} sx={{width:"40%", minWidth: "300px", margin:"20px"}}>
    <h3>Subject: {s.name}</h3>
    <h3>Room: {s.room_number}</h3>
    <h3>Time: {s.time}</h3>
    <UpdateDialog />
  </Item>)
 
  return (
    <div>
         <button onClick={()=>navigate("/home")}>Back to Main Page</button>
      <form onSubmit={handleSubmit}>
        <h2>Add Subject</h2>
        <label> Name:</label>
        <input
          name="name"
          type="text"
          autoComplete="on"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label> Room Number:</label>
        <input
          name="room_number"
          type="text"
          autoComplete="on"
          id="room_number"
          value={formData.room_number}
          onChange={handleChange}
        />
        <label> Time:</label>
        <input
          name="time"
          type="time"
          autoComplete="on"
          id="time"
          value={formData.time}
          onChange={handleChange}
        />
    
        <label> Assign to Teacher:</label>
        <select
          value={formData.teacher_id}
          name="teacher_id"
          onChange={handleChange}
        >
          <option>Choose Teacher</option>
          {dropDownOptions}
        </select>
        <button type="submit">Add Subject</button>
      </form>
      <h3>Existing Subjects</h3>
      {subjectsList}
    </div>
  );
}

export default Subject;
