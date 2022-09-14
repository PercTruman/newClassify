import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Welcome from "./Welcome";
import Signup from "./Signup";
import Home from "./Home";
import Student from "./Student";
import Subject from "./Subject";

// import { UserContext } from "./context/UserContext";

function App() {
  // const context = useContext(UserContext);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/students" element={<Student />} />
        <Route path="/subjects" element={<Subject />} />
      </Routes>
    </div>
  );
}

export default App;

