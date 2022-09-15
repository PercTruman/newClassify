import React, { useState, useEffect, useContext } from "react";
// import { UserContext } from "./context/UserContext";
import {useParams, useNavigate} from 'react-router-dom'

function SubjectDetail() {
    const [classroom, setClassroom] = useState({})
    // const {students} = useContext(UserContext)
 const navigate = useNavigate()
    const {id} = useParams()

    useEffect(()=>{
        fetch(`/subjects/${id}`)
        .then(r=>r.json())
        .then(data => setClassroom(data))
    }, [])
    console.log(classroom)
  return (
    <div>
      <h1>{classroom.name}</h1>
      <button onClick={()=>navigate("/subjects")}>Back to Subjects Main Page</button>
    </div>
  );
}

export default SubjectDetail;
