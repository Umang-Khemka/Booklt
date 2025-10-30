import axios from "axios";
import type { AxiosInstance } from "axios"; 

const promoInstance: AxiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api/v1/promo"
      : "/api/v1/promo",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default promoInstance;
