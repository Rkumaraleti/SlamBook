/* eslint-disable no-undef */
import axiosInstance from "../services/axiosInstance";

import { useState } from "react";

import { toast } from "react-toastify";

import CustomButton from "../components/CustomButton";
import GoogleLogin from "../components/GoogleLogin";

// Navigate:
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usernameValidation = document.getElementById("username");
    const emailValidation = document.getElementById("email");
    const passwordValidation = document.getElementById("password");
    emailValidation.classList.add(
      "invalid:p-2",
      "invalid:border-rounded-xl",
      "invalid:bg-red-500/30",
      "invalid:focus:border-red-500"
    );
    usernameValidation.classList.add(
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
      const res = await axiosInstance.post(`/auth/register`, formData);
      toast.success(res.data.message);
      Navigate("/");
    } catch (err) {
      toast.info(err.response.data.message);
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
                <h1 className="text-4xl font-bold gsap-title">Register</h1>
              </div>
              <div className="">
                <div className=" flex flex-col items-center m-4">
                  <input
                    name="username"
                    type="type"
                    id="username"
                    placeholder="username"
                    className="m-4 min-w-[100px] w-[80%] border-b-2 focus:border-black focus:outline-none gsap-form-input"
                    autoFocus
                    onChange={handleChange}
                  />
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
                  <CustomButton
                    text="Login"
                    buttonStyle={"hover:bg-cyan-300 bg-cyan-400"}
                    routeTo={"/login"}
                  />
                  <button
                    type="Submit"
                    className={
                      "p-3 m-1 rounded-3xl hover:shadow-xl p-3 m-1 rounded-3xl hover:shadow-xl bg-yellow-400 hover:bg-yellow-300 gsap-form-button"
                    }
                    onClick={handleSubmit}
                  >
                    Register
                  </button>
                </div>
              </div>

              <GoogleLogin />
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default Register;
