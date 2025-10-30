import { create } from "zustand";
import type { AxiosError } from "axios";
import experienceInstance from "../api/experienceInstance";
import type { Experience, ExperienceState } from "../types/experience.ts";

export const useExperienceStore = create<ExperienceState>((set) => ({
  experiences: [], // ✅ Always initialize as array
  selectedExperience: null,
  loading: false,
  error: null,

  fetchExperiences: async () => {
  set({ loading: true, error: null });
  try {
    console.log("🔍 Fetching from:", experienceInstance.defaults.baseURL); // Check URL
    const res = await experienceInstance.get<Experience[]>("/");
    
    console.log("📦 Raw response:", res);
    console.log("📊 Response data:", res.data);
    console.log("📏 Data length:", res.data?.length);
    console.log("✅ Is Array?", Array.isArray(res.data));
    
    const experiences = Array.isArray(res.data) ? res.data : [];
    
    set({ experiences, loading: false });
    console.log("✅ Experiences stored:", experiences.length);
  } catch (error) {
    console.error("❌ Fetch failed:", error);
    const err = error as AxiosError<{ message?: string }>;
    set({
      error: err.response?.data?.message ?? "Failed to fetch experiences",
      loading: false,
      experiences: []
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