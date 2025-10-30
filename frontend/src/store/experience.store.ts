import { create } from "zustand";
import type { AxiosError } from "axios";
import experienceInstance from "../api/experienceInstance";
import type { Experience, ExperienceState } from "../types/experience.ts";

export const useExperienceStore = create<ExperienceState>((set) => ({
  experiences: [],
  selectedExperience: null,
  loading: false,
  error: null,

  fetchExperiences: async () => {
    set({ loading: true, error: null });
    try {
      const res = await experienceInstance.get<Experience[]>("/");
      set({ experiences: res.data, loading: false });
          console.log("✅ Experiences fetched and stored:", res.data);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      set({
        error: err.response?.data?.message ?? "Failed to fetch experiences",
        loading: false,
      });
    }
  },

  fetchExperienceById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await experienceInstance.get<Experience>(`/${id}`);
      set({ selectedExperience: res.data, loading: false });
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      set({
        error: err.response?.data?.message ?? "Failed to fetch experience",
        loading: false,
      });
    }
  },
}));
