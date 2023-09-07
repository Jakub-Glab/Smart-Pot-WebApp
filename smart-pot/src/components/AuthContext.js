import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearAuthContext = () => {
    sessionStorage.removeItem("accessToken");
    setUser(null);
  };

  const setUserContext = () => {
    const accesToken = sessionStorage.getItem("accessToken");
    const refreshToken = sessionStorage.getItem("refreshToken");
    if (accesToken && refreshToken) {
      setUser({ accesToken, refreshToken });
    }
  };

  useEffect(() => {
    setUserContext();
    setIsLoading(false);
  }, []);

  const value = {
    user,
    setUser,
    clearAuthContext,
    setUserContext,
  };

  return (
    <AuthContext.Provider value={{ ...value, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
