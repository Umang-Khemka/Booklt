import axios from "axios";
import type { AxiosInstance } from "axios"; 

const bookingInstance: AxiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api/v1/bookings"
      : "/api/v1/bookings",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default bookingInstance;
