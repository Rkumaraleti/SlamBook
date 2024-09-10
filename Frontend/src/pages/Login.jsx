/* eslint-disable no-undef */
import axios from "axios";

import CustomButton from "../components/CustomButton";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

// Context:
import { useAuth } from "../context/authContext";

// Toaster:
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValidation = document.getElementById("email");
    const passwordValidation = document.getElementById("password");
    emailValidation.classList.add(
      "invalid:p-2",
      "invalid:border-rounded-xl",
      "invalid:bg-red-500/30",
      "invalid:focus:border-red-500"
    );
    passwordValidation.classList.add(
      "invalid:p-2",
      "invalid:border-rounded-xl",
      "invalid:bg-red-500/30",
      "invalid:focus:border-red-500"
    );
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        formData,
        {
          withCredentials: true,
        }
      );
      login(res.data.user, res.data.message);
      Navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
      Navigate("/login");
    }
  };

  return (
    <>
      <div className="container flex w-screen h-screen items-center m-auto ">
        <section className="flex h-100 items-center text-center block w-[90vw] m-auto">
          <form className="w-screen">
            <div className="border rounded-md border-black min-w-[400px] max-w-[500px] m-auto p-5">
              <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold gsap-title">Login</h1>
              </div>
              <div className="">
                <div className=" flex flex-col items-center m-4">
                  <input
                    name="email"
                    type="email"
                    id="email"
                    placeholder="email"
                    className="m-4 min-w-[100px] w-[80%] border-b-2 focus:border-black focus:outline-none gsap-form-input"
                    autoFocus
                    onChange={handleChange}
                  />
                  <input
                    name="password"
                    type="password"
                    id="password"
                    placeholder="password"
                    className="m-4 min-w-[100px] w-[80%] border-b-2 focus:border-black focus:outline-none gsap-form-input"
                    pattern=".{8,}"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <button
                    type="Submit"
                    className={
                      "p-3 m-1 rounded-3xl hover:shadow-xl p-3 m-1 rounded-3xl hover:shadow-xl bg-yellow-400 hover:bg-yellow-300 gsap-form-button"
                    }
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                  <CustomButton
                    text="Register"
                    buttonStyle={"hover:bg-cyan-300 bg-cyan-400"}
                    routeTo={"/register"}
                  />
                </div>
              </div>

              <div className="w-100 border-2 border-black py-3 bg-white-500 hover:bg-cyan-400 rounded m-2 hover:text-white">
                <button className="text-md">
                  <i className="fa-brands fa-google"></i> Google
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default Login;
