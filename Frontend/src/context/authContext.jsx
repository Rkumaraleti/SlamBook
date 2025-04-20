import { createContext, useContext, useState, useEffect } from "react";
import { setLogoutFunction } from "../services/axiosInstance";
import axiosInstance from "../services/axiosInstance";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedToken) {
      const fetchuser = async () => {
        try {
          const res = await axiosInstance.get("/auth/user", {
            withCredentials: true,
          });
          setUsername(res.data.username);
        } catch (err) {
          console.error(username + err);
        }
      };
      fetchuser();
    }

    // Pass the logout function to axiosInstance
    setLogoutFunction(logout);
  }, []);

  const login = (token) => {
    setToken(token);
    localStorage.setItem("jwtToken", token);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("jwtToken");
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ username, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default { useAuth, AuthProvider };
