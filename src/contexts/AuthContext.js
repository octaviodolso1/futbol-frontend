import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        console.log("Usuario almacenado recuperado:", parsedUser);
        setUser(parsedUser);
      }

      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        console.log("Token almacenado recuperado:", storedToken);
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Error al analizar el usuario almacenado:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, []);

  const login = (userData, userToken) => {
    try {
      setUser(userData);
      setToken(userToken);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userToken);
      navigate("/tournaments");
    } catch (error) {
      console.error("Error al almacenar los datos de usuario:", error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
