import {create} from "zustand";
import type { AxiosError } from "axios";
import userInstance from "../api/userInstance";
import type { User } from "../types/user";
import type { AuthState } from "../types/user";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  register: async (username, email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await userInstance.post<{ user: User }>("/register", {
        username,
        email,
        password,
      });

      set({ user: res.data.user, loading: false });
      return true;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      set({
        error: err.response?.data?.message || "Registration failed",
        loading: false,
      });
      return false;
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await userInstance.post<{ user: User }>("/login", {
        email,
        password,
      });

      set({ user: res.data.user, loading: false });
      return true;
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      set({
        error: err.response?.data?.message || "Login failed",
        loading: false,
      });
      return false;
    }
  },

  logout: async () => {
    try {
      await userInstance.post("/logout");
      set({ user: null });
      console.log("logout successfull");
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      set({ error: err.response?.data?.message || "Logout failed" });
    }
  },

  checkAuth: async () => {
    set({ loading: true });
    try {
      const res = await userInstance.get<{ user: User }>("/me");
      set({ user: res.data.user, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },
}));
