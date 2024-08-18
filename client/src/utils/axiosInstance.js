import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api", //Replace with your own API URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
