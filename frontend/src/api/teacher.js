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

export const createTeacher = async (teacherData, navigate) => {
  try {
    const reqUrl = `${import.meta.env.VITE_BACKENDURL}/teacher/create`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.post(reqUrl, teacherData);
    return response;
  } catch (error) {
    handleErrorResponse(error, navigate);
  }
};

export const getTeacher = async (page, navigate) => {
  try {
    const reqUrl = `${
      import.meta.env.VITE_BACKENDURL
    }/teacher/getanalytics/${page}`;
    const response = await axios.get(reqUrl);
    return response;
  } catch (error) {
    handleErrorResponse(error, navigate);
  }
};

export const deleteTeacher = async (id, navigate) => {
  try {
    const reqUrl = `${import.meta.env.VITE_BACKENDURL}/teacher/delete/${id}`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.delete(reqUrl);
    return response;
  } catch (error) {
    handleErrorResponse(error, navigate);
  }
};

export const updateTeacher = async (id, teacherData, navigate) => {
  try {
    const reqUrl = `${import.meta.env.VITE_BACKENDURL}/teacher/update/${id}`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.put(reqUrl, teacherData);
    return response;
  } catch (error) {
    handleErrorResponse(error, navigate);
  }
};
