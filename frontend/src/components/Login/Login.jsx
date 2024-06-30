import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData] = useState({
    email: "aicandashboard123@gmail.com",
    password: "aicantest123",
  });

  const handleSubmit = async () => {
    const result = await loginUser(formData);
    if (result) {
      setTimeout(() => {
        navigate("/");
      }, 2500);
      toast.success("Login Successfull", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="w-full h-screen flex justify-center items-center">
        <div className="flex flex-col items-center gap-5 mt-[2rem]">
          <h1 className="font-medium text-2xl text-[#ff6d2c] mb-5">
            Admin Panel Login
          </h1>
          <div className="flex gap-2 w-full justify-end">
            <label
              htmlFor="email"
              className="text-md md:text-2xl flex justify-end items-center text-[#474444]"
            >
              Email :
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="outline-none p-2 w-64 bg-[#f4f4f4] border-none rounded-md text-[#474444]"
            />
          </div>

          <div className="flex gap-2 w-full justify-end">
            <label
              htmlFor="password"
              className="text-md md:text-2xl flex justify-end items-center text-[#474444]"
            >
              Password :
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              readOnly
              className="outline-none p-2 w-64 bg-[#f4f4f4] border-none rounded-md text-[#474444] mt-3"
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              onClick={handleSubmit}
              className="px-1 py-1 w-20 bg-[#a9bcff] rounded-md font-normal border-none text-[#474444] text-lg cursor-pointer"
            >
              Log In
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
