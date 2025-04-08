import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const navigate = useNavigate();

  // Function to log in the user
  const login = (userData, token) => {
    try {
      setUser(userData); // Set user state
      localStorage.setItem("jwtToken", token); // Store JWT token in localStorage
      localStorage.setItem("user", JSON.stringify(userData)); // Store user data in localStorage
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };

  // Function to log out the user
  const logout = () => {
    try {
      setUser(null); // Clear user state
      localStorage.removeItem("jwtToken"); // Remove JWT token from localStorage
      localStorage.removeItem("user"); // Remove user data from localStorage
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error clearing user data:", error);
    }
  };

  // Function to persist user on app initialization
  useEffect(() => {
    try {
      const token = localStorage.getItem("jwtToken");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        setUser(JSON.parse(storedUser)); // Restore user state from localStorage
      }
    } catch (error) {
      console.error("Error restoring user data:", error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
