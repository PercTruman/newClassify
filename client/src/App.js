import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import './App.css';
import theme from './UI/theme'
import Login from "./Login";
import Welcome from "./Welcome";
import Signup from "./Signup";
import Home from "./Home";
import Student from "./Student";
import Subject from "./Subject";
import SubjectDetail from "./SubjectDetail";
import Teacher from "./Teacher";
import backgroundWithPencils from "./images/backgroundWithPencils.jpg"
import diagonalPencils from "./images/diagonalPencils.jpg" 



function App() {
 return (
    <div className="App"
          style={{
            backgroundImage: `url(${diagonalPencils})`,
            height: "100vh",
            width: "auto",
            backgroundSize: "cover"
          }} >
      
      <ThemeProvider  theme={theme}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/-login" element={<Login />} />
          <Route path="/-signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/-students" element={<Student />} />
          <Route path="/-subjects" element={<Subject />} />
          <Route path="/-subjects/:id" element={<SubjectDetail />} />
          <Route path="/-teachers" element={<Teacher />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
