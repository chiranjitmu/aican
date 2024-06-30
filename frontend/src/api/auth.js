import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const loginUser = async ({ email, password }) => {
  try {
    const reqUrl = `${import.meta.env.VITE_BACKENDURL}/auth/login`;
    const response = await axios.post(reqUrl, {
      email,
      password,
    });
    if (response.data?.token) {
      localStorage.setItem("token", JSON.stringify(response.data?.token));
      localStorage.setItem("name", JSON.stringify(response.data?.name));
      localStorage.setItem("userId", JSON.stringify(response.data?.userId));
    }
    return true;
  } catch (error) {
    if (error.response.data?.errorMessage) {
      toast.error(error.response.data?.errorMessage, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    } else {
      toast.error("Something went wrong", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
};