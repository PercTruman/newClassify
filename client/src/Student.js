import React, {useState, useEffect} from 'react'


function Student() {


    const [formData, setFormData] = useState({
        name: ""
      })
      const [students, setStudents] = useState([])

      useEffect(() => {
        getStudents();
      }, []);

      function getStudents() {
        
          fetch('/students')
            .then((res) => res.json())
            .then((data) => {
              setStudents(data);
            });
        }
      

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
          setFormData({name: ""});
        });
      } else {
        res.json().then((errors) => {
          alert(errors.error);
        });
      }
    });
  };

  const studentsList = students.map(s => <li key={s.id}>{s.name}</li>)
  return (
    <div>
    <form onSubmit={handleSubmit}>
    <h2>Add Student</h2>
    <label> Name:</label>
    <input
      name="name"
      type="text"
      autoComplete="on"
      id="name"
      value={formData.name}
      onChange={handleChange}
    />
      <button type="submit">Add Student</button>
    </form>
    <h3>Students</h3>
      {studentsList}
    </div>
    
  )
}

export default Student