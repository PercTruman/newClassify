import React, { useState, useEffect, createContext } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorsList, setErrorsList] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("api/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        data.error ? setLoggedIn(false) : setLoggedIn(true);
      });
    fetch("api/teachers")
      .then((res) => res.json())
      .then((data) => {
        setTeachers(data);
      });
    fetch("api/subjects")
      .then((res) => res.json())
      .then((data) => setSubjects(data));

    fetch("api/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  const login = (user) => {
    setUser(user);
    setLoggedIn(true);
  };

  const logout = (user) => {
    setUser({});
    setLoggedIn(false);
  };

  const signup = (user) => {
    setUser(user);
    setLoggedIn(true);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        subjects,
        setSubjects,
        teachers,
        setTeachers,
        students, 
        setStudents,
        loggedIn,
        errorsList,
        setErrorsList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
