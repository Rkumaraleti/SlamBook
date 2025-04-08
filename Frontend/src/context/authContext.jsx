import { createContext, useContext, useState, useEffect } from "react";

import axios from "axios";

import { toast } from "react-toastify";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = sessionStorage.getItem("user");
    setUser(u);
  }, [user]);

  const login = (userData, message) => {
    const user = JSON.stringify(userData);
    // const resMessage = JSON.stringify(message);
    sessionStorage.setItem("user", user);
    setUser(sessionStorage.getItem("user"));
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const logout = async () => {
    // Perform logout logic
    // ...
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/auth/logout`,
      {
        withCredentials: true,
      }
    );

    sessionStorage.removeItem("user");
    setUser(null);
    toast.success(res.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return res;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};