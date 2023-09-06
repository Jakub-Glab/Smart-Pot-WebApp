import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("accessToken"); // remove the token from local storage
    setUser(null); // set the user state to null
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setUser({ token });
    }
    setIsLoading(false);
  }, []);

  const value = {
    user,
    setUser,
    logout,
  };

  return (
    <AuthContext.Provider value={{ ...value, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
