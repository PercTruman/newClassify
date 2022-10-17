import React, {useEffect, useContext} from "react";
import { UserContext } from "./context/UserContext";
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



function App() {
  const { user, setUser, setLoggedIn } = useContext(UserContext);

  useEffect(() => {
    fetch("/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        data.error ? setLoggedIn(false) : setLoggedIn(true);
      });
  }, [user]);
  return (
    <div className="App" >
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
