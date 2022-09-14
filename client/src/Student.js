import React, {useState} from 'react'

function Student() {

    const [formData, setFormData] = useState({
        name: ""
      })
      const [students, setStudents] = useState([])


  const handleChange = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/students', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((newStudent) => {
          const updatedStudentList = [...students, newStudent];
          setStudents(updatedStudentList);
          setFormData({ name: ""});
        });
      } else {
        res.json().then((errors) => {
          alert(errors.error);
        });
      }
    });
  };
  return (
    <form onSubmit={handleSubmit}>
    <h2>Add Student</h2>
    <label> Name:</label>
    <input
      name="name"
      type="text"
      autoComplete="on"
      id="name"
      value={formData.first_name}
      onChange={handleChange}
    />
      <button type="submit">Add Student</button>
    </form>
  )
}

export default Student