import React, { createContext, useContext, useState } from "react";

// Create the context
const UserContext = createContext();

// Custom hook to use the context
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to update login state and user data
  const login = (data) => {
    setUserData(data);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUserData('');
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ userData, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
