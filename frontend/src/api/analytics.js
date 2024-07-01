import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const handleErrorResponse = (error, navigate) => {
  if (error.response?.data?.errorMessage === "Unauthorized access! Invalid token") {
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
  } else if (error.response?.data?.errorMessage) {
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

export const getMonthlyExpenses = async (navigate) => {
  try {
    const reqUrl = `${import.meta.env.VITE_BACKENDURL}/analytics/expenses/monthly`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(reqUrl);
    return response;
  } catch (error) {
    handleErrorResponse(error, navigate);
  }
};

export const getYearlyExpenses = async (navigate) => {
  try {
    const reqUrl = `${import.meta.env.VITE_BACKENDURL}/analytics/expenses/yearly`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(reqUrl);
    return response;
  } catch (error) {
    handleErrorResponse(error, navigate);
  }
};
