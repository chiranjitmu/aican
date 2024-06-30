import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const handleErrorResponse = (error, navigate) => {
  if (
    error.response.data?.errorMessage === "Unauthorized access! Invalid token"
  ) {
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
    setTimeout(() => {
      navigate("/auth");
      localStorage.removeItem("token");
    }, 3500);
  } else if (error.response.data?.errorMessage) {
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
};

export const createStudent = async (studentData, navigate) => {
  try {
    const reqUrl = `${import.meta.env.VITE_BACKENDURL}/student/create`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.post(reqUrl, studentData);
    return response;
  } catch (error) {
    handleErrorResponse(error, navigate);
  }
};

export const getMaleAndFemaleAnalytics = async (className, navigate) => {
  try {
    const reqUrl = `${
      import.meta.env.VITE_BACKENDURL
    }/student/getmaleandfemale/${className}`;
    const response = await axios.get(reqUrl);
    console.log(response);
    return response;
  } catch (error) {
    handleErrorResponse(error, navigate);
  }
};
