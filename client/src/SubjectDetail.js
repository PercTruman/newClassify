import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

function SubjectDetail() {
  const theme = useTheme();

  const [classroom, setClassroom] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`/subjects/${id}`)
      .then((r) => r.json())
      .then((data) => setClassroom(data));
  }, []);
  console.log(classroom);
  return (
    <div>
      <h1>{classroom.name}</h1>
      <button onClick={() => navigate("/subjects")}>
        Back to Subjects Main Page
      </button>
    </div>
  );
}

export default SubjectDetail;
