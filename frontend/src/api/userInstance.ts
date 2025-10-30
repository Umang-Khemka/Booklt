import axios from "axios";
import type { AxiosInstance } from "axios"; 

const userInstance: AxiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api/v1/users"
      : "/api/v1/users",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default userInstance;
