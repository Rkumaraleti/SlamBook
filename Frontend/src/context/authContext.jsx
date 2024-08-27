import { createContext, useContext, useState, useEffect } from "react";

import axios from "axios";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    setUser(u);
  }, [user]);

  const login = (userData) => {
    const user = JSON.stringify(userData);
    localStorage.setItem("user", user);
    setUser(localStorage.getItem("user"));
  };

  const logout = async () => {
    // Perform logout logic
    // ...
    const res = await axios.get(`http://localhost:3000/auth/logout`, {
      withCredentials: true,
    });
    console.log(res);
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
