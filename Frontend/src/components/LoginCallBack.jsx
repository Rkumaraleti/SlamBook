import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const LoginCallBack = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      login(token);
      navigate("/"); // Redirect to home after login
    } else {
      console.error("No token found in the URL");
      navigate("/login"); // Redirect to login if no token
    }
  }, []);

  return <div className="mt-[100px]">Processing login...</div>;
};

export default LoginCallBack;
