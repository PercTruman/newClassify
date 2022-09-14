import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/UserContext";


function Subject() {
    const { user, teachers, setTeachers } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    room_number: "",
    time: "",
    teacher_id: "",
  });
  const [subjects, setSubjects] = useState([]);


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
            time: null,
            teacher_id: null,
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
    <option type="integer" key={t.id} name="teacher_id" value={t.id} >
      {t.name}
    </option>

  ));

  const subjectsList = subjects.map((s) => <li key={s.id}>{s.name}</li>);
  return (
    <div>
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
          name="subjectAssign"
          onChange={handleChange}
        >
          <option>Choose Teacher</option>
          {dropDownOptions}
        </select>
        <button type="submit">Add Subject</button>
      </form>
      <h3>Subjects</h3>
      {subjectsList}
    </div>
  );
}

export default Subject;
