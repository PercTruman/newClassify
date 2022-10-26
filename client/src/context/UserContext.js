import React, { useState, useEffect, createContext } from "react";


const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        data.error ? setLoggedIn(false) : setLoggedIn(true);
      });
  }, []);

  const login = (user) => {
    setUser(user);
    setLoggedIn(true);
  };

  const logout = () => {
    setUser({});
    setLoggedIn(false);
  };

  const signup = (user) => {
    setUser(user);
    setLoggedIn(true);
  };

  const makeNewSubjectList = (updatedSubject)=> {
    const keptSubjects = user.subjects.filter(subject => subject.id !== updatedSubject.id)
    const newList = [...keptSubjects, updatedSubject]
    updateUserSubjects({...user, user_subjects: newList})
   }

  function updateUserSubjects(newData) {
    setUser(newData);
  }


  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setLoggedIn,
        login,
        logout,
        signup,
        loggedIn,
        makeNewSubjectList      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
