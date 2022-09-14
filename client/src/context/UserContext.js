import React, { useState, useEffect, createContext } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorsList, setErrorsList] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch("/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        data.error ? setLoggedIn(false) : setLoggedIn(true);
      });
    fetch("/teachers")
      .then((res) => res.json())
      .then((data) => {
        setTeachers(data);
      });
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
        teachers,
        setTeachers,
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
