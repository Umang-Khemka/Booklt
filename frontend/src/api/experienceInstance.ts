import axios from "axios";
import type { AxiosInstance } from "axios";

const experienceInstance: AxiosInstance = axios.create({
     baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api/v1/experiences"
      : "/api/v1/experiences",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default experienceInstance;