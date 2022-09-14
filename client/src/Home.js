import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import Navbar from "./Navbar";

const Home = () => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: ""
  })
  const [teachers, setTeachers] = useState([])

  useEffect(() => {
    getTeachers();
  }, [user]);

  function getTeachers() {
    if (user) {
      fetch('/teachers')
        .then((res) => res.json())
        .then((data) => {
          setTeachers(data);
        });
    }
  }
 

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/teachers', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((newTeacher) => {
          const updatedTeacherList = [...teachers, newTeacher];
          setTeachers(updatedTeacherList);
          setFormData({ name: ""});
        });
      } else {
        res.json().then((errors) => {
          alert(errors.error);
        });
      }
    });
  };

  const teachersList = teachers.map(t => <li key={t.id}>{t.name}</li>)

  return user ? (
    <div>
      <Navbar />
      <h3>{user.username}'s Homepage</h3>
      <form onSubmit={handleSubmit}>
        <h2>Add Teacher</h2>
        <label> Name:</label>
        <input
          name="name"
          type="text"
          autoComplete="on"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
        <button type="submit">Add Teacher</button>
      </form>
      <h3>Teachers</h3>
      {teachersList}
    </div>
  ) : (
    <div>
      <h2>Loading Students...</h2>
    </div>
  );
};

export default Home;
